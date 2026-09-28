import axios from "axios";

import HttpClient, { handleApiError } from "@shared/libs/httpClient";
import type {
  BackendChest,
  BackendGameItem,
  BackendLevel,
  BackendMission,
  BackendMissionStatus,
  BackendProviderItem,
  BackendRoom,
  BackendUpdateMissionPayload,
  CreateRoomPayload,
  GetAdminPlayerChestsQuery,
  GetChestsQuery,
  GetLevelsQuery,
  GetMissionsQuery,
  GetPlayersQuery,
  GetRoomsQuery,
  ResolveChestClaimPayload,
  UpdateChestPayload,
  UpdatePlayerPayload,
  UpdateRoomPayload,
  UserMissionChestAdmin,
} from "@shared/types/admin";
import type {
  ApiResponse,
  HttpClientInterface,
  LoginResponse,
  PaginatedApiResponse,
} from "@shared/types/http";
import { casinoToast } from "@shared/utils/casinoToast";

import { API_URL, LOCAL_STORAGE_KEYS, ROUTES } from "@/constant";
import type { Player } from "@/types/adminPlayers";
import type {
  AdminUser as AdminPanelUser,
  AdminUserFormData,
} from "@/types/adminUsers";
import type { AdminUser } from "@/types/auth";
import type {
  BackendMissionReward,
  GetAdminMissionRewardsQuery,
  ResolveMissionRewardPayload,
} from "@/types/review/AdminMissionRewards";
import type {
  ReviewQueueParams,
  ReviewStepSubmission,
  UserMissionReviewItem,
} from "@/types/review/ReviewMission";

const httpClient = new HttpClient(API_URL, axios, LOCAL_STORAGE_KEYS);

let isRedirecting = false;

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const url = error.config?.url as string;

      if (url.includes("/auth/login")) {
        return Promise.reject(error);
      }
      if (!isRedirecting) {
        isRedirecting = true;
        localStorage.removeItem(LOCAL_STORAGE_KEYS.accessToken);
        casinoToast.error({
          title: "Sesión expirada",
          description:
            "Tu sesión ha expirado, por favor inicia sesión de nuevo",
          duration: 5000,
        });
        window.location.href = ROUTES.index;
        setTimeout(() => {
          isRedirecting = false;
        }, 100);
      }
    }
    return Promise.reject(error);
  },
);

export default class ApiAdminGanaya {
  constructor(private readonly httpClient: HttpClientInterface) {}

  async login(username: string, password: string) {
    const result: ApiResponse<LoginResponse> = {
      data: null,
      status: false,
      message: "",
    };
    try {
      const { data } = await this.httpClient.post({
        url: "/auth/login",
        body: { username, password },
      });

      // Backend returns: { access_token, token_type, expires_in }
      const rawResponse = data as ApiResponse<LoginResponse>;

      if (rawResponse?.data?.accessToken) {
        result.status = true;
        result.data = rawResponse?.data;
      } else {
        result.message = "Credenciales inválidas";
      }

      result.message = rawResponse.message; //

      return result;
    } catch (error) {
      return handleApiError(error, result);
    }
  }

  async getMe(): Promise<ApiResponse<AdminUser>> {
    let result: ApiResponse<AdminUser> = {
      data: null,
      status: false,
      message: "",
    };
    try {
      const { data } = await this.httpClient.get({ url: "/auth/me" });
      const response = data as ApiResponse<AdminUser>;
      result = response;
      return result;
    } catch (error) {
      return handleApiError(error, result);
    }
  }

  async logout(): Promise<void> {
    try {
      await this.httpClient.post({ url: "/auth/logout" });
    } catch {
      // Best-effort: cleanup proceeds regardless
    }
  }

  // ── Admin Missions API ──

  async createMission(data: FormData): Promise<ApiResponse<BackendMission>> {
    const result: ApiResponse<BackendMission> = {
      data: null,
      status: false,
      message: "",
    };
    try {
      const { data: response } = await this.httpClient.post({
        url: "/missions",
        body: data,
      });
      const responseData = response as ApiResponse<BackendMission>;
      if (responseData?.status) result.status = true;
      result.data = responseData.data;
      result.message = responseData.message;
      return result;
    } catch (error) {
      return handleApiError(error, result);
    }
  }

  async getMissions(
    params?: GetMissionsQuery,
  ): Promise<PaginatedApiResponse<BackendMission[]>> {
    const result: PaginatedApiResponse<BackendMission[]> = {
      data: null,
      status: false,
      message: "",
      meta: null,
    };
    try {
      let url = "/missions";
      if (params) {
        const searchParams = new URLSearchParams();
        if (params.take !== undefined && params.take !== null)
          searchParams.append("take", params.take.toString());
        if (params.skip !== undefined && params.skip !== null)
          searchParams.append("skip", params.skip.toString());
        if (params.status !== undefined && params.status !== null)
          searchParams.append("status", params.status);
        if (params.type !== undefined && params.type !== null)
          searchParams.append("type", params.type);
        if (params.roomId !== undefined && params.roomId !== null)
          searchParams.append("roomId", params.roomId.toString());

        const queryString = searchParams.toString();
        if (queryString) url += `?${queryString}`;
      }
      const { data } = await this.httpClient.get({ url });
      const response = data as PaginatedApiResponse<BackendMission[]>;
      if (response?.status) result.status = true;
      result.data = response.data;
      result.message = response.message;
      result.meta = response.meta ?? null;
      return result;
    } catch (error) {
      return handleApiError(error, result) as unknown as PaginatedApiResponse<
        BackendMission[]
      >;
    }
  }

  async getMissionById(id: number): Promise<ApiResponse<BackendMission>> {
    const result: ApiResponse<BackendMission> = {
      data: null,
      status: false,
      message: "",
    };
    try {
      const { data } = await this.httpClient.get({
        url: `/missions/${id}`,
      });
      const response = data as ApiResponse<BackendMission>;
      if (response?.status) result.status = true;
      result.data = response.data;
      result.message = response.message;
      return result;
    } catch (error) {
      return handleApiError(error, result);
    }
  }

  async updateMission(
    id: number,
    payload: Partial<BackendUpdateMissionPayload>,
  ): Promise<ApiResponse<BackendMission>> {
    const result: ApiResponse<BackendMission> = {
      data: null,
      status: false,
      message: "",
    };
    try {
      const { data } = await this.httpClient.patch({
        url: `/missions/${id}`,
        body: payload,
      });
      const response = data as ApiResponse<BackendMission>;
      if (response?.status) result.status = true;
      result.data = response.data;
      result.message = response.message;
      return result;
    } catch (error) {
      return handleApiError(error, result);
    }
  }

  async activateMission(id: number): Promise<ApiResponse<BackendMission>> {
    const result: ApiResponse<BackendMission> = {
      data: null,
      status: false,
      message: "",
    };
    try {
      const { data } = await this.httpClient.post({
        url: `/missions/${id}/activate`,
      });
      const response = data as ApiResponse<BackendMission>;
      if (response?.status) result.status = true;
      result.data = response.data;
      result.message = response.message;
      return result;
    } catch (error) {
      return handleApiError(error, result);
    }
  }

  async updateMissionStatus(
    id: number,
    status: BackendMissionStatus,
  ): Promise<ApiResponse<BackendMission>> {
    const result: ApiResponse<BackendMission> = {
      data: null,
      status: false,
      message: "",
    };
    try {
      const { data } = await this.httpClient.patch({
        url: `/missions/${id}/status`,
        body: { status },
      });
      const response = data as ApiResponse<BackendMission>;
      if (response?.status) result.status = true;
      result.data = response.data;
      result.message = response.message;
      return result;
    } catch (error) {
      return handleApiError(error, result);
    }
  }

  // ── Admin Review API ──

  async getReviewQueue(
    params?: ReviewQueueParams,
  ): Promise<PaginatedApiResponse<UserMissionReviewItem[]>> {
    const result: PaginatedApiResponse<UserMissionReviewItem[]> = {
      data: null,
      status: false,
      message: "",
      meta: null,
    };
    try {
      let url = "/missions/admin/review-queue";

      if (params) {
        const searchParams = new URLSearchParams();
        if (params.status) searchParams.append("status", params.status);
        if (params.playerId !== undefined && params.playerId !== null)
          searchParams.append("playerId", params.playerId.toString());
        if (params.type) searchParams.append("type", params.type);
        if (params.minExperience !== undefined && params.minExperience !== null)
          searchParams.append("minExperience", params.minExperience.toString());
        if (params.maxExperience !== undefined && params.maxExperience !== null)
          searchParams.append("maxExperience", params.maxExperience.toString());
        if (
          params.minCoinsAmount !== undefined &&
          params.minCoinsAmount !== null
        )
          searchParams.append(
            "minCoinsAmount",
            params.minCoinsAmount.toString(),
          );
        if (
          params.maxCoinsAmount !== undefined &&
          params.maxCoinsAmount !== null
        )
          searchParams.append(
            "maxCoinsAmount",
            params.maxCoinsAmount.toString(),
          );
        if (params.take !== undefined)
          searchParams.append("take", params.take.toString());
        if (params.skip !== undefined)
          searchParams.append("skip", params.skip.toString());
        if (searchParams.toString()) url += `?${searchParams.toString()}`;
      }

      const { data } = await this.httpClient.get({ url });
      const response = data as PaginatedApiResponse<UserMissionReviewItem[]>;
      if (response?.status) result.status = true;
      result.data = response.data;
      result.message = response.message;
      result.meta = response.meta ?? null;
      return result;
    } catch (error) {
      return handleApiError(error, result) as unknown as PaginatedApiResponse<
        UserMissionReviewItem[]
      >;
    }
  }

  async reviewStep(
    stepId: number,
    body: { status: "APPROVED" | "REJECTED"; reviewerNotes?: string },
  ): Promise<ApiResponse<ReviewStepSubmission>> {
    const result: ApiResponse<ReviewStepSubmission> = {
      data: null,
      status: false,
      message: "",
    };
    try {
      const { data } = await this.httpClient.post({
        url: `/missions/admin/steps/${stepId}/review`,
        body,
      });
      const response = data as ApiResponse<ReviewStepSubmission>;
      if (response?.status) result.status = true;
      result.data = response.data;
      result.message = response.message;
      return result;
    } catch (error) {
      return handleApiError(error, result);
    }
  }

  async getUserMissionById(
    userMissionId: number,
  ): Promise<ApiResponse<UserMissionReviewItem>> {
    const result: ApiResponse<UserMissionReviewItem> = {
      data: null,
      status: false,
      message: "",
    };
    try {
      const { data } = await this.httpClient.get({
        url: `/missions/user-missions/${userMissionId}`,
      });
      const response = data as ApiResponse<UserMissionReviewItem>;
      if (response?.status) result.status = true;
      result.data = response.data;
      result.message = response.message;
      return result;
    } catch (error) {
      return handleApiError(error, result);
    }
  }

  // ── Mission Rewards API ──

  async claimUserMissionReward(
    userMissionId: number,
  ): Promise<ApiResponse<BackendMissionReward>> {
    const result: ApiResponse<BackendMissionReward> = {
      data: null,
      status: false,
      message: "",
    };
    try {
      const { data } = await this.httpClient.post({
        url: `/rewards/user-missions/${userMissionId}/claim`,
      });
      const response = data as ApiResponse<BackendMissionReward>;
      if (response?.status) result.status = true;
      result.data = response.data;
      result.message = response.message;
      return result;
    } catch (error) {
      return handleApiError(error, result);
    }
  }

  async getAdminMissionRewards(
    params?: GetAdminMissionRewardsQuery,
  ): Promise<PaginatedApiResponse<BackendMissionReward[]>> {
    const result: PaginatedApiResponse<BackendMissionReward[]> = {
      data: null,
      status: false,
      message: "",
      meta: null,
    };
    try {
      let url = "/rewards/admin";
      if (params) {
        const searchParams = new URLSearchParams();
        if (params.status) searchParams.append("status", params.status);
        if (params.playerId !== undefined && params.playerId !== null)
          searchParams.append("playerId", params.playerId.toString());
        if (params.userMissionId !== undefined && params.userMissionId !== null)
          searchParams.append("userMissionId", params.userMissionId.toString());
        if (params.orderBy) searchParams.append("orderBy", params.orderBy);
        if (params.orderDirection)
          searchParams.append("orderDirection", params.orderDirection);
        if (params.take !== undefined)
          searchParams.append("take", params.take.toString());
        if (params.skip !== undefined)
          searchParams.append("skip", params.skip.toString());
        if (searchParams.toString()) url += `?${searchParams.toString()}`;
      }

      const { data } = await this.httpClient.get({ url });
      const response = data as PaginatedApiResponse<BackendMissionReward[]>;
      if (response?.status) result.status = true;
      result.data = response.data;
      result.message = response.message;
      result.meta = response.meta ?? null;
      return result;
    } catch (error) {
      return handleApiError(error, result) as unknown as PaginatedApiResponse<
        BackendMissionReward[]
      >;
    }
  }

  async resolveMissionReward(
    rewardId: number,
    payload: ResolveMissionRewardPayload,
  ): Promise<ApiResponse<BackendMissionReward>> {
    const result: ApiResponse<BackendMissionReward> = {
      data: null,
      status: false,
      message: "",
    };
    try {
      const { data } = await this.httpClient.post({
        url: `/rewards/admin/${rewardId}/resolve`,
        body: payload,
      });
      const response = data as ApiResponse<BackendMissionReward>;
      if (response?.status) result.status = true;
      result.data = response.data;
      result.message = response.message;
      return result;
    } catch (error) {
      return handleApiError(error, result);
    }
  }

  // ── Admin Players API ──

  async getPlayers(
    params?: GetPlayersQuery,
  ): Promise<PaginatedApiResponse<Player[]>> {
    const result: PaginatedApiResponse<Player[]> = {
      data: null,
      status: false,
      message: "",
      meta: null,
    };
    try {
      let url = "/players";
      if (params) {
        const searchParams = new URLSearchParams();
        if (params.take !== undefined && params.take !== null)
          searchParams.append("take", params.take.toString());
        if (params.skip !== undefined && params.skip !== null)
          searchParams.append("skip", params.skip.toString());
        if (
          params.username !== undefined &&
          params.username !== null &&
          params.username.trim() !== ""
        )
          searchParams.append("username", params.username.trim());
        if (
          params.phone !== undefined &&
          params.phone !== null &&
          params.phone.trim() !== ""
        )
          searchParams.append("phone", params.phone.trim());
        if (params.levelId !== undefined && params.levelId !== null)
          searchParams.append("levelId", params.levelId.toString());
        if (params.roomId !== undefined && params.roomId !== null)
          searchParams.append("roomId", params.roomId.toString());
        if (params.minExperience !== undefined && params.minExperience !== null)
          searchParams.append("minExperience", params.minExperience.toString());
        if (params.maxExperience !== undefined && params.maxExperience !== null)
          searchParams.append("maxExperience", params.maxExperience.toString());
        if (params.isActive !== undefined && params.isActive !== null)
          searchParams.append("isActive", params.isActive.toString());
        if (
          params.orderDirection !== undefined &&
          params.orderDirection !== null
        )
          searchParams.append("orderDirection", params.orderDirection);

        const queryString = searchParams.toString();
        if (queryString) url += `?${queryString}`;
      }
      const { data } = await this.httpClient.get({ url });
      const response = data as PaginatedApiResponse<Player[]>;
      if (response?.status) result.status = true;
      result.data = response.data;
      result.message = response.message;
      result.meta = response.meta ?? null;
      return result;
    } catch (error) {
      return handleApiError(error, result) as unknown as PaginatedApiResponse<
        Player[]
      >;
    }
  }

  async getPlayerById(id: number): Promise<ApiResponse<Player>> {
    const result: ApiResponse<Player> = {
      data: null,
      status: false,
      message: "",
    };
    try {
      const { data } = await this.httpClient.get({
        url: `/players/${id}`,
      });
      const response = data as ApiResponse<Player>;
      if (response?.status) result.status = true;
      result.data = response.data;
      result.message = response.message;
      return result;
    } catch (error) {
      return handleApiError(error, result);
    }
  }

  async updatePlayer(
    id: number,
    payload: UpdatePlayerPayload,
  ): Promise<ApiResponse<Player>> {
    const result: ApiResponse<Player> = {
      data: null,
      status: false,
      message: "",
    };
    try {
      const { data } = await this.httpClient.patch({
        url: `/players/${id}`,
        body: payload,
      });
      const response = data as ApiResponse<Player>;
      if (response?.status) result.status = true;
      result.data = response.data;
      result.message = response.message;
      return result;
    } catch (error) {
      return handleApiError(error, result);
    }
  }

  // ── Admin Users API ──

  async getUsers(params?: {
    take?: number;
    skip?: number;
  }): Promise<PaginatedApiResponse<AdminPanelUser[]>> {
    const result: PaginatedApiResponse<AdminPanelUser[]> = {
      data: null,
      status: false,
      message: "",
      meta: null,
    };
    try {
      let url = "/users";
      if (params?.take !== undefined || params?.skip !== undefined) {
        const searchParams = new URLSearchParams();
        if (params.take !== undefined)
          searchParams.append("take", params.take.toString());
        if (params.skip !== undefined)
          searchParams.append("skip", params.skip.toString());
        if (searchParams.toString()) url += `?${searchParams.toString()}`;
      }
      const { data } = await this.httpClient.get({ url });
      const response = data as PaginatedApiResponse<AdminPanelUser[]>;
      if (response?.status) result.status = true;
      result.data = response.data;
      result.message = response.message;
      result.meta = response.meta ?? null;
      return result;
    } catch (error) {
      return handleApiError(error, result) as unknown as PaginatedApiResponse<
        AdminPanelUser[]
      >;
    }
  }

  async getUserById(id: number): Promise<ApiResponse<AdminPanelUser>> {
    const result: ApiResponse<AdminPanelUser> = {
      data: null,
      status: false,
      message: "",
    };
    try {
      const { data } = await this.httpClient.get({
        url: `/users/${id}`,
      });
      const response = data as ApiResponse<AdminPanelUser>;
      if (response?.status) result.status = true;
      result.data = response.data;
      result.message = response.message;
      return result;
    } catch (error) {
      return handleApiError(error, result);
    }
  }

  async createUser(
    body: AdminUserFormData,
  ): Promise<ApiResponse<AdminPanelUser>> {
    const result: ApiResponse<AdminPanelUser> = {
      data: null,
      status: false,
      message: "",
    };
    try {
      const { data } = await this.httpClient.post({
        url: "/users",
        body,
      });
      const response = data as ApiResponse<AdminPanelUser>;
      if (response?.status) result.status = true;
      result.data = response.data;
      result.message = response.message;
      return result;
    } catch (error) {
      return handleApiError(error, result);
    }
  }

  async updateUser(
    id: number,
    body: Partial<AdminUserFormData>,
  ): Promise<ApiResponse<AdminPanelUser>> {
    const result: ApiResponse<AdminPanelUser> = {
      data: null,
      status: false,
      message: "",
    };
    try {
      const { data } = await this.httpClient.patch({
        url: `/users/${id}`,
        body,
      });
      const response = data as ApiResponse<AdminPanelUser>;
      if (response?.status) result.status = true;
      result.data = response.data;
      result.message = response.message;
      return result;
    } catch (error) {
      return handleApiError(error, result);
    }
  }

  // ── Admin Levels API ──

  async getLevels(
    params?: GetLevelsQuery,
  ): Promise<PaginatedApiResponse<BackendLevel[]>> {
    const result: PaginatedApiResponse<BackendLevel[]> = {
      data: null,
      status: false,
      message: "",
      meta: null,
    };
    try {
      let url = "/levels";
      if (params) {
        const searchParams = new URLSearchParams();
        if (params.take !== undefined && params.take !== null)
          searchParams.append("take", params.take.toString());
        if (params.skip !== undefined && params.skip !== null)
          searchParams.append("skip", params.skip.toString());
        if (
          params.name !== undefined &&
          params.name !== null &&
          params.name.trim() !== ""
        )
          searchParams.append("name", params.name.trim());
        if (params.roomId !== undefined && params.roomId !== null)
          searchParams.append("roomId", params.roomId.toString());
        if (
          params.minCoins !== undefined &&
          params.minCoins !== null &&
          !Number.isNaN(Number(params.minCoins))
        )
          searchParams.append("minCoins", params.minCoins.toString());
        if (
          params.maxCoins !== undefined &&
          params.maxCoins !== null &&
          !Number.isNaN(Number(params.maxCoins))
        )
          searchParams.append("maxCoins", params.maxCoins.toString());
        if (
          params.minExperience !== undefined &&
          params.minExperience !== null &&
          !Number.isNaN(Number(params.minExperience))
        )
          searchParams.append("minExperience", params.minExperience.toString());
        if (
          params.maxExperience !== undefined &&
          params.maxExperience !== null &&
          !Number.isNaN(Number(params.maxExperience))
        )
          searchParams.append("maxExperience", params.maxExperience.toString());
        if (params.sortOrder !== undefined && params.sortOrder !== null)
          searchParams.append("sortOrder", params.sortOrder);

        const queryString = searchParams.toString();
        if (queryString) url += `?${queryString}`;
      }
      const { data } = await this.httpClient.get({ url });
      const response = data as PaginatedApiResponse<BackendLevel[]>;
      if (response?.status) result.status = true;
      result.data = response.data;
      result.message = response.message;
      result.meta = response.meta ?? null;
      return result;
    } catch (error) {
      return handleApiError(error, result) as unknown as PaginatedApiResponse<
        BackendLevel[]
      >;
    }
  }

  async getLevelById(id: number): Promise<ApiResponse<BackendLevel>> {
    const result: ApiResponse<BackendLevel> = {
      data: null,
      status: false,
      message: "",
    };
    try {
      const { data } = await this.httpClient.get({
        url: `/levels/${id}`,
      });
      const response = data as ApiResponse<BackendLevel>;
      if (response?.status) result.status = true;
      result.data = response.data;
      result.message = response.message;
      return result;
    } catch (error) {
      return handleApiError(error, result);
    }
  }

  async createLevel(formData: FormData): Promise<ApiResponse<BackendLevel>> {
    const result: ApiResponse<BackendLevel> = {
      data: null,
      status: false,
      message: "",
    };
    try {
      const { data: response } = await this.httpClient.post({
        url: "/levels",
        body: formData,
      });
      const responseData = response as ApiResponse<BackendLevel>;
      if (responseData?.status) result.status = true;
      result.data = responseData.data;
      result.message = responseData.message;
      return result;
    } catch (error) {
      return handleApiError(error, result);
    }
  }

  async updateLevel(
    id: number,
    formData: FormData,
  ): Promise<ApiResponse<BackendLevel>> {
    const result: ApiResponse<BackendLevel> = {
      data: null,
      status: false,
      message: "",
    };
    try {
      const { data: response } = await this.httpClient.patch({
        url: `/levels/${id}`,
        body: formData,
      });
      const responseData = response as ApiResponse<BackendLevel>;
      if (responseData?.status) result.status = true;
      result.data = responseData.data;
      result.message = responseData.message;
      return result;
    } catch (error) {
      return handleApiError(error, result);
    }
  }

  // ── Admin Rooms API ──

  async getRooms(
    params?: GetRoomsQuery,
  ): Promise<PaginatedApiResponse<BackendRoom[]>> {
    const result: PaginatedApiResponse<BackendRoom[]> = {
      data: null,
      status: false,
      message: "",
      meta: null,
    };
    try {
      let url = "/rooms";
      if (params) {
        const searchParams = new URLSearchParams();
        if (params.take !== undefined && params.take !== null)
          searchParams.append("take", params.take.toString());
        if (params.skip !== undefined && params.skip !== null)
          searchParams.append("skip", params.skip.toString());
        if (
          params.name !== undefined &&
          params.name !== null &&
          params.name.trim() !== ""
        )
          searchParams.append("name", params.name.trim());
        if (params.bonus !== undefined && params.bonus !== null)
          searchParams.append("bonus", params.bonus.toString());
        if (params.isActive !== undefined && params.isActive !== null)
          searchParams.append("isActive", params.isActive.toString());

        const queryString = searchParams.toString();
        if (queryString) url += `?${queryString}`;
      }
      const { data } = await this.httpClient.get({ url });
      const response = data as PaginatedApiResponse<BackendRoom[]>;
      if (response?.status) result.status = true;
      result.data = response.data;
      result.message = response.message;
      result.meta = response.meta ?? null;
      return result;
    } catch (error) {
      return handleApiError(error, result) as unknown as PaginatedApiResponse<
        BackendRoom[]
      >;
    }
  }

  async getRoomById(id: number): Promise<ApiResponse<BackendRoom>> {
    const result: ApiResponse<BackendRoom> = {
      data: null,
      status: false,
      message: "",
    };
    try {
      const { data } = await this.httpClient.get({
        url: `/rooms/${id}`,
      });
      const response = data as ApiResponse<BackendRoom>;
      if (response?.status) result.status = true;
      result.data = response.data;
      result.message = response.message;
      return result;
    } catch (error) {
      return handleApiError(error, result);
    }
  }

  async createRoom(
    payload: CreateRoomPayload,
  ): Promise<ApiResponse<BackendRoom>> {
    const result: ApiResponse<BackendRoom> = {
      data: null,
      status: false,
      message: "",
    };
    try {
      const { data } = await this.httpClient.post({
        url: "/rooms",
        body: payload,
      });
      const response = data as ApiResponse<BackendRoom>;
      if (response?.status) result.status = true;
      result.data = response.data;
      result.message = response.message;
      return result;
    } catch (error) {
      return handleApiError(error, result);
    }
  }

  async updateRoom(
    id: number,
    payload: UpdateRoomPayload,
  ): Promise<ApiResponse<BackendRoom>> {
    const result: ApiResponse<BackendRoom> = {
      data: null,
      status: false,
      message: "",
    };
    try {
      const { data } = await this.httpClient.patch({
        url: `/rooms/${id}`,
        body: payload,
      });
      const response = data as ApiResponse<BackendRoom>;
      if (response?.status) result.status = true;
      result.data = response.data;
      result.message = response.message;
      return result;
    } catch (error) {
      return handleApiError(error, result);
    }
  }

  async updateRoomStatus(
    id: number,
    isActive: boolean,
  ): Promise<ApiResponse<BackendRoom>> {
    const result: ApiResponse<BackendRoom> = {
      data: null,
      status: false,
      message: "",
    };
    try {
      const { data } = await this.httpClient.patch({
        url: `/rooms/${id}/status`,
        body: { isActive },
      });
      const response = data as ApiResponse<BackendRoom>;
      if (response?.status) result.status = true;
      result.data = response.data;
      result.message = response.message;
      return result;
    } catch (error) {
      return handleApiError(error, result);
    }
  }

  // ── Panel Catalog API (Games & Providers) ──

  async getGames(): Promise<ApiResponse<BackendGameItem[]>> {
    const result: ApiResponse<BackendGameItem[]> = {
      data: null,
      status: false,
      message: "",
    };
    try {
      const { data } = await this.httpClient.get({
        url: "/panel/games",
      });
      const response = data as ApiResponse<BackendGameItem[]>;
      if (response?.status) result.status = true;
      result.data = response.data;
      result.message = response.message;
      return result;
    } catch (error) {
      return handleApiError(error, result);
    }
  }

  async getProviders(): Promise<ApiResponse<BackendProviderItem[]>> {
    const result: ApiResponse<BackendProviderItem[]> = {
      data: null,
      status: false,
      message: "",
    };
    try {
      const { data } = await this.httpClient.get({
        url: "/panel/providers",
      });
      const response = data as ApiResponse<BackendProviderItem[]>;
      if (response?.status) result.status = true;
      result.data = response.data;
      result.message = response.message;
      return result;
    } catch (error) {
      return handleApiError(error, result);
    }
  }

  // ── Admin Chests API ──

  async getChests(
    params?: GetChestsQuery,
  ): Promise<PaginatedApiResponse<BackendChest[]>> {
    const result: PaginatedApiResponse<BackendChest[]> = {
      data: null,
      status: false,
      message: "",
      meta: null,
    };
    try {
      let url = "/chests";
      if (params) {
        const searchParams = new URLSearchParams();
        if (params.take !== undefined && params.take !== null)
          searchParams.append("take", params.take.toString());
        if (params.skip !== undefined && params.skip !== null)
          searchParams.append("skip", params.skip.toString());
        if (
          params.title !== undefined &&
          params.title !== null &&
          params.title.trim() !== ""
        )
          searchParams.append("title", params.title.trim());
        if (params.periodType !== undefined && params.periodType !== null)
          searchParams.append("periodType", params.periodType);
        if (params.isActive !== undefined && params.isActive !== null)
          searchParams.append("isActive", params.isActive.toString());
        if (
          params.minCoins !== undefined &&
          params.minCoins !== null &&
          !Number.isNaN(Number(params.minCoins))
        )
          searchParams.append("minCoins", params.minCoins.toString());
        if (
          params.maxCoins !== undefined &&
          params.maxCoins !== null &&
          !Number.isNaN(Number(params.maxCoins))
        )
          searchParams.append("maxCoins", params.maxCoins.toString());
        if (
          params.minRequiredMissions !== undefined &&
          params.minRequiredMissions !== null &&
          !Number.isNaN(Number(params.minRequiredMissions))
        )
          searchParams.append(
            "minRequiredMissions",
            params.minRequiredMissions.toString(),
          );
        if (
          params.maxRequiredMissions !== undefined &&
          params.maxRequiredMissions !== null &&
          !Number.isNaN(Number(params.maxRequiredMissions))
        )
          searchParams.append(
            "maxRequiredMissions",
            params.maxRequiredMissions.toString(),
          );
        if (params.roomId !== undefined && params.roomId !== null)
          searchParams.append("roomId", params.roomId.toString());

        const queryString = searchParams.toString();
        if (queryString) url += `?${queryString}`;
      }
      const { data } = await this.httpClient.get({ url });
      const response = data as PaginatedApiResponse<BackendChest[]>;
      if (response?.status) result.status = true;
      result.data = response.data;
      result.message = response.message;
      result.meta = response.meta ?? null;
      return result;
    } catch (error) {
      return handleApiError(error, result) as unknown as PaginatedApiResponse<
        BackendChest[]
      >;
    }
  }

  async getChestById(id: number): Promise<ApiResponse<BackendChest>> {
    const result: ApiResponse<BackendChest> = {
      data: null,
      status: false,
      message: "",
    };
    try {
      const { data } = await this.httpClient.get({
        url: `/chests/${id}`,
      });
      const response = data as ApiResponse<BackendChest>;
      if (response?.status) result.status = true;
      result.data = response.data;
      result.message = response.message;
      return result;
    } catch (error) {
      return handleApiError(error, result);
    }
  }

  async createChest(formData: FormData): Promise<ApiResponse<BackendChest>> {
    const result: ApiResponse<BackendChest> = {
      data: null,
      status: false,
      message: "",
    };
    try {
      const { data: response } = await this.httpClient.post({
        url: "/chests",
        body: formData,
      });
      const responseData = response as ApiResponse<BackendChest>;
      if (responseData?.status) result.status = true;
      result.data = responseData.data;
      result.message = responseData.message;
      return result;
    } catch (error) {
      return handleApiError(error, result);
    }
  }

  async updateChest(
    id: number,
    payload: UpdateChestPayload,
  ): Promise<ApiResponse<BackendChest>> {
    const result: ApiResponse<BackendChest> = {
      data: null,
      status: false,
      message: "",
    };
    try {
      const { data } = await this.httpClient.patch({
        url: `/chests/${id}`,
        body: payload,
      });
      const response = data as ApiResponse<BackendChest>;
      if (response?.status) result.status = true;
      result.data = response.data;
      result.message = response.message;
      return result;
    } catch (error) {
      return handleApiError(error, result);
    }
  }

  async updateChestStatus(
    id: number,
    isActive: boolean,
  ): Promise<ApiResponse<BackendChest>> {
    const result: ApiResponse<BackendChest> = {
      data: null,
      status: false,
      message: "",
    };
    try {
      const { data } = await this.httpClient.patch({
        url: `/chests/${id}/status`,
        body: { isActive },
      });
      const response = data as ApiResponse<BackendChest>;
      if (response?.status) result.status = true;
      result.data = response.data;
      result.message = response.message;
      return result;
    } catch (error) {
      return handleApiError(error, result);
    }
  }

  async updateChestImage(
    id: number,
    formData: FormData,
  ): Promise<ApiResponse<BackendChest>> {
    const result: ApiResponse<BackendChest> = {
      data: null,
      status: false,
      message: "",
    };
    try {
      const { data: response } = await this.httpClient.post({
        url: `/chests/${id}/image`,
        body: formData,
      });
      const responseData = response as ApiResponse<BackendChest>;
      if (responseData?.status) result.status = true;
      result.data = responseData.data;
      result.message = responseData.message;
      return result;
    } catch (error) {
      return handleApiError(error, result);
    }
  }

  async deleteChestImage(id: number): Promise<ApiResponse<BackendChest>> {
    const result: ApiResponse<BackendChest> = {
      data: null,
      status: false,
      message: "",
    };
    try {
      const { data } = await this.httpClient.delete({
        url: `/chests/${id}/image`,
      });
      const response = data as ApiResponse<BackendChest>;
      if (response?.status) result.status = true;
      result.data = response.data;
      result.message = response.message;
      return result;
    } catch (error) {
      return handleApiError(error, result);
    }
  }

  // ── Admin Player Chests & Prizes API ──

  async getAdminPlayerChests(
    params?: GetAdminPlayerChestsQuery,
  ): Promise<PaginatedApiResponse<UserMissionChestAdmin[]>> {
    const result: PaginatedApiResponse<UserMissionChestAdmin[]> = {
      data: null,
      status: false,
      message: "",
      meta: null,
    };
    try {
      let url = "/player-chests/admin";
      if (params) {
        const searchParams = new URLSearchParams();
        if (params.take !== undefined && params.take !== null)
          searchParams.append("take", params.take.toString());
        if (params.skip !== undefined && params.skip !== null)
          searchParams.append("skip", params.skip.toString());
        if (params.playerId !== undefined && params.playerId !== null)
          searchParams.append("playerId", params.playerId.toString());
        if (params.chestId !== undefined && params.chestId !== null)
          searchParams.append("chestId", params.chestId.toString());
        if (params.status !== undefined && params.status !== null)
          searchParams.append("status", params.status);
        if (
          params.periodKey !== undefined &&
          params.periodKey !== null &&
          params.periodKey.trim() !== ""
        )
          searchParams.append("periodKey", params.periodKey.trim());
        if (params.orderBy !== undefined && params.orderBy !== null)
          searchParams.append("orderBy", params.orderBy);
        if (
          params.orderDirection !== undefined &&
          params.orderDirection !== null
        )
          searchParams.append("orderDirection", params.orderDirection);

        const queryString = searchParams.toString();
        if (queryString) url += `?${queryString}`;
      }
      const { data } = await this.httpClient.get({ url });
      const response = data as PaginatedApiResponse<UserMissionChestAdmin[]>;
      if (response?.status) result.status = true;
      result.data = response.data;
      result.message = response.message;
      result.meta = response.meta ?? null;
      return result;
    } catch (error) {
      return handleApiError(error, result) as unknown as PaginatedApiResponse<
        UserMissionChestAdmin[]
      >;
    }
  }

  async resolvePlayerChestClaim(
    claimId: number,
    payload: ResolveChestClaimPayload,
  ): Promise<ApiResponse<UserMissionChestAdmin>> {
    const result: ApiResponse<UserMissionChestAdmin> = {
      data: null,
      status: false,
      message: "",
    };
    try {
      const { data } = await this.httpClient.post({
        url: `/player-chests/admin/${claimId}/resolve`,
        body: payload,
      });
      const response = data as ApiResponse<UserMissionChestAdmin>;
      if (response?.status) result.status = true;
      result.data = response.data;
      result.message = response.message;
      return result;
    } catch (error) {
      return handleApiError(error, result);
    }
  }
}

export const apiAdminGanaya = new ApiAdminGanaya(httpClient);
