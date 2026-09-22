import axios from "axios";

import HttpClient, { handleApiError } from "@shared/libs/httpClient";
import type {
  BackendCreateMissionPayload,
  BackendLevel,
  BackendMission,
  BackendMissionStatus,
  GetLevelsQuery,
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
  ReviewQueueByPlayer,
  ReviewQueueParams,
} from "@/types/review/ReviewQueueByPlayer";
import type { StepSubmission } from "@/types/review/StepSubmission";

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

  async getMissions(params?: {
    take?: number;
    skip?: number;
  }): Promise<PaginatedApiResponse<BackendMission[]>> {
    const result: PaginatedApiResponse<BackendMission[]> = {
      data: null,
      status: false,
      message: "",
      meta: null,
    };
    try {
      let url = "/missions";
      if (params?.take !== undefined || params?.skip !== undefined) {
        const searchParams = new URLSearchParams();
        if (params.take !== undefined)
          searchParams.append("take", params.take.toString());
        if (params.skip !== undefined)
          searchParams.append("skip", params.skip.toString());
        if (searchParams.toString()) url += `?${searchParams.toString()}`;
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
    payload: Partial<BackendCreateMissionPayload>,
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
  ): Promise<PaginatedApiResponse<ReviewQueueByPlayer[]>> {
    const result: PaginatedApiResponse<ReviewQueueByPlayer[]> = {
      data: null,
      status: false,
      message: "",
      meta: null,
    };
    try {
      let url = "/admin/missions/review-queue";

      if (params) {
        const searchParams = new URLSearchParams();
        if (params.status) searchParams.append("status", params.status);
        if (params.type) searchParams.append("type", params.type);
        if (params.take !== undefined)
          searchParams.append("take", params.take.toString());
        if (params.skip !== undefined)
          searchParams.append("skip", params.skip.toString());
        if (searchParams.toString()) url += `?${searchParams.toString()}`;
      }

      const { data } = await this.httpClient.get({ url });
      const response = data as PaginatedApiResponse<ReviewQueueByPlayer[]>;
      if (response?.status) result.status = true;
      result.data = response.data;
      result.message = response.message;
      result.meta = response.meta ?? null;
      return result;
    } catch (error) {
      return handleApiError(error, result) as unknown as PaginatedApiResponse<
        ReviewQueueByPlayer[]
      >;
    }
  }

  async reviewStep(
    stepId: number,
    body: { status: "APPROVED" | "REJECTED"; reviewerNotes?: string },
  ): Promise<ApiResponse<StepSubmission>> {
    const result: ApiResponse<StepSubmission> = {
      data: null,
      status: false,
      message: "",
    };
    try {
      const { data } = await this.httpClient.post({
        url: `/admin/missions/steps/${stepId}/review`,
        body,
      });
      const response = data as ApiResponse<StepSubmission>;
      if (response?.status) result.status = true;
      result.data = response.data;
      result.message = response.message;
      return result;
    } catch (error) {
      return handleApiError(error, result);
    }
  }

  // ── Admin Players API ──

  async getPlayers(params?: {
    take?: number;
    skip?: number;
  }): Promise<PaginatedApiResponse<Player[]>> {
    const result: PaginatedApiResponse<Player[]> = {
      data: null,
      status: false,
      message: "",
      meta: null,
    };
    try {
      let url = "/players";
      if (params?.take !== undefined || params?.skip !== undefined) {
        const searchParams = new URLSearchParams();
        if (params.take !== undefined)
          searchParams.append("take", params.take.toString());
        if (params.skip !== undefined)
          searchParams.append("skip", params.skip.toString());
        if (searchParams.toString()) url += `?${searchParams.toString()}`;
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
        if (params.bonus !== undefined && params.bonus !== null)
          searchParams.append("bonus", params.bonus.toString());
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
}

export const apiAdminGanaya = new ApiAdminGanaya(httpClient);
