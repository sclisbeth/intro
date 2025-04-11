import { createSelector } from '@ngrx/store';

import { ApplicationState } from '../application-state';
import { selectError as selectErrorGWService, selectEventResponse } from './gateway-service.selector';
import { selectError as selectErrorGWPayment } from './gateway-service.selector';
import { Permissions } from 'src/app/core/enums/permissions';
import { Role } from 'src/app/core/enums/role';
import { Entity } from 'src/app/core/enums/entity';

export const selectAuthentication = (state: ApplicationState) => state.auth;

export const selectTransactionalUser = createSelector(
  selectAuthentication,
  (state) => `${state.transactional?.user.firstName} ${state.transactional?.user.lastName}`
)

export const selectTransactionalUserBranchOffice = createSelector(
  selectAuthentication,
  (state) => `${state.transactional?.user.entity.name} - ${state.transactional?.user.agency.name}`
)

export const selectTransactionalUsername = createSelector(
  selectAuthentication,
  (state) => state.transactional?.user?.username
)

export const selectTransactionalEntity = createSelector(
  selectAuthentication,
  (state) => state.transactional?.user?.entity.id
)

export const selectTransactionalCashierInformation = createSelector(
  selectAuthentication,
  (state) => {
    return {
      entityId: state.transactional?.user?.entity.id,
      entityName: state.transactional?.user?.entity.name,
      BranchOfficeName: state.transactional?.user?.agency.name,
    }
  }
)

export const selectTransactionalToken = createSelector(
  selectAuthentication,
  (state) => state.transactional?.user?.token
)

export const selectTransactionalError = createSelector(
  selectAuthentication,
  (state) => {
    return state.transactional?.error
  }
)

export const selectTransactionalServices = createSelector(
  selectAuthentication,
  (state) => state.transactional?.user?.services
)

export const selectTransactionalEvents = createSelector(
  selectAuthentication,
  (state) => state.transactional?.user?.events
)

export const selectTransactionalPayChannels = createSelector(
  selectAuthentication,
  (state) => state.transactional?.user?.payChannels
)


export const selectTransactionalUserPayChannels = createSelector(
  selectAuthentication,
  (state) => state.transactional?.user?.payChannels?.length > 0
)

export const selectTransactionalUserPasswordIsChanged = createSelector(
  selectAuthentication,
  (state) => state.transactional?.user?.passwordIsChanged ?? false
)

export const selectGatewayPaymentToken = createSelector(
  selectAuthentication,
  (state) => state.gatewayPayment?.user?.token ?? null
)

export const selectIsLoading = createSelector(
  selectAuthentication,
  (state) => {
    return state.isLoading
  }
)

export const selectTransactionalTokenIsValid = createSelector(
  selectAuthentication,
  (state) => {
    return {
      tokenTransactional: state.transactional?.user?.token,
      tokenGWPayment: state.gatewayPayment?.user?.token,
      tokenGWService: state.gatewayService?.user?.token,
      createdAt: state.createdAt,
      lastActivity: state.lastActivity
    };
  }
)

export const selectAllIsLoaded = createSelector(
  selectAuthentication,
  selectEventResponse,
  (state, eventResponse) => {
    const isLoggedIn = state.transactional?.isLoggedIn && state.gatewayPayment?.isLoggedIn && state.gatewayService?.isLoggedIn && eventResponse.isLoaded;
    const error = state.transactional?.error?.length > 0 || state.gatewayPayment?.error?.length > 0 || state.gatewayService?.error?.length > 0 || eventResponse.error?.length > 0;
    if (error) {
      return false;
    } else {
      if (isLoggedIn == undefined) {
        return false;
      }
      return isLoggedIn ? false : true;
    }
  }
)

export const selectError = createSelector(
  selectAuthentication,
  selectErrorGWService,
  selectErrorGWPayment,
  (state, errorGWService, errorGWPayment) => {
    if (state.transactional?.error?.length > 0) {
      return state.transactional?.error;
    } else if (state.gatewayPayment?.error?.length > 0) {
      return state.gatewayPayment?.error;
    } else if (state.gatewayService?.error?.length > 0) {
      return state.gatewayService?.error;
    } else if (errorGWService?.length > 0) {
      return errorGWService;
    } else if (errorGWPayment?.length > 0) {
      return errorGWPayment;
    } else {
      return '';
    }
  }
)

export const selectPayChannels = createSelector(
  selectAuthentication,
  (state) => {
    const gatewayPayment = state.gatewayPayment?.payChannels?.map((x: any) => x.external_code) ?? [];
    const authPayment = state.transactional?.user?.payChannels?.map((x: any) => x.code) ?? [];
    return authPayment.filter((x: string) => gatewayPayment.includes(x)) ?? [];
  }
)

export const selectPrevaluedBilling = createSelector(
  selectTransactionalEvents,
  (state) => state?.filter((x: any) => x.prevalued_billing).length > 0
)

export const selectTransactionalRoleId = createSelector(
  selectAuthentication,
  (state) => state.transactional?.user ? Number(state.transactional?.user?.role.id) : 0
)

export const selectTransactionalEntityId = createSelector(
  selectAuthentication,
  (state) => state.transactional?.user ? Number(state.transactional?.user?.entity.id) : 0
)

export const selectTransactionalPermissions = createSelector(
  selectAuthentication,
  (state) => state.transactional?.user ? state.transactional?.user?.permissions : []
)

export const selectTransactionalIsCajeroServiExpress = createSelector(
  selectAuthentication,
  (state) => state.transactional?.user?.role.id == Role.CajeroAgencia && state.transactional?.user?.entity.id == Entity.ServiExpress
)


export const selectTransactionalShowReports = createSelector(
  selectAuthentication,
  (state) => state.transactional?.user?.role.id != Role.PagosVirtuales || state.transactional?.user?.role.id != Role.Cobranza
)

export const selectTransactionalShowDailyCollections = createSelector(
  selectAuthentication,
  (state) => state.transactional?.user?.role.id != Role.ObservadorAgencia
)

export const selectTransactionalShowServices = createSelector(
  selectAuthentication,
  selectTransactionalPermissions,
  (state, permission) => [Permissions.ServiceShow, Permissions.ServiceFilter, Permissions.ServiceSearchCode].some((x: any) => permission.includes(x))
)

export const selectTransactionalShowTransactions = createSelector(
  selectAuthentication,
  selectTransactionalPermissions,
  (state, permission) => [Permissions.TransactionShow, Permissions.TransactionFilter, Permissions.TransactionDashboardShow].some((x: any) => permission.includes(x))
)

export const selectTransactionalShowTransactionsCancelAction = createSelector(
  selectAuthentication,
  selectTransactionalPermissions,
  (state, permission) => [Permissions.TransactionCancelShow, Permissions.TransactionCancelFilter, Permissions.TransactionCancelRegister, Permissions.TransactionCancelReverse].some((x: any) => permission.includes(x))
)

export const selectTransactionalShowTransactionsReprintAction = createSelector(
  selectAuthentication,
  selectTransactionalPermissions,
  (state, permission) => [Permissions.TransactionReprintShow, , Permissions.TransactionReprintFilter, , Permissions.TransactionReprintPrint].some((x: any) => permission.includes(x))
)

export const selectTransactionalShowTransactionsUser = createSelector(
  selectAuthentication,
  selectTransactionalPermissions,
  (state, permission) => [Permissions.ReportShowTransactionsGeneral].some((x: any) => permission.includes(x))
)
