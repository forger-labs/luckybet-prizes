import axios from "axios";
import { sileo } from "sileo";

import HttpClient, { handleApiError } from "@shared/libs/httpClient";
import type {
  BackendCreateMissionPayload,
  BackendMission,
  BackendMissionStatus,
} from "@shared/types/admin";
import type {
  ApiResponse,
  HttpClientInterface,
  LoginResponse,
} from "@shared/types/http";

import { API_URL, LOCAL_STORAGE_KEYS, ROUTES } from "@/constant";
import type { AdminUser } from "@/types/auth";

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
        sileo.error({
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

  async createMission(
    payload: BackendCreateMissionPayload,
  ): Promise<ApiResponse<BackendMission>> {
    const result: ApiResponse<BackendMission> = {
      data: null,
      status: false,
      message: "",
    };
    try {
      const { data } = await this.httpClient.post({
        url: "/missions",
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

  async getMissions(params?: {
    take?: number;
    skip?: number;
  }): Promise<ApiResponse<BackendMission[]>> {
    const result: ApiResponse<BackendMission[]> = {
      data: null,
      status: false,
      message: "",
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
      const response = data as ApiResponse<BackendMission[]>;
      if (response?.status) result.status = true;
      result.data = response.data;
      result.message = response.message;
      return result;
    } catch (error) {
      return handleApiError(error, result);
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
}

export const apiAdminGanaya = new ApiAdminGanaya(httpClient);
