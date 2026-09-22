import axios from "axios";

import HttpClient, { handleApiError } from "@shared/libs/httpClient";
import type { BackendLevel, GetLevelsQuery } from "@shared/types/admin";
import type {
  ApiResponse,
  HttpClientInterface,
  PaginatedApiResponse,
} from "@shared/types/http";

import { API_URL, LOCAL_STORAGE_KEYS } from "@/constant";
import type {
  PlayedGameItem,
  PlayedGamesQuery,
  PlayedGamesResponse,
  PlayerMeResponse,
  StepSubmissionItem,
  UserMissionBasic,
  UserMissionWithSteps,
} from "@/types/player";

const httpClient = new HttpClient(API_URL, axios, LOCAL_STORAGE_KEYS);

export class ApiWebGanaya {
  constructor(private readonly httpClient: HttpClientInterface) {}

  // ── Player Profile & Status ──

  async getMe(): Promise<ApiResponse<PlayerMeResponse>> {
    const result: ApiResponse<PlayerMeResponse> = {
      data: null,
      status: false,
      message: "",
    };
    try {
      const { data } = await this.httpClient.get({
        url: "/players/me",
      });
      const response = data as ApiResponse<PlayerMeResponse>;
      if (response?.status) result.status = true;
      result.data = response.data;
      result.message = response.message;
      return result;
    } catch (error) {
      return handleApiError(error, result);
    }
  }

  async getLastGame(): Promise<ApiResponse<PlayedGameItem | null>> {
    const result: ApiResponse<PlayedGameItem | null> = {
      data: null,
      status: false,
      message: "",
    };
    try {
      const { data } = await this.httpClient.get({
        url: "/players/me/last-game",
      });
      const response = data as ApiResponse<PlayedGameItem | null>;
      if (response?.status) result.status = true;
      result.data = response.data;
      result.message = response.message;
      return result;
    } catch (error) {
      return handleApiError(error, result);
    }
  }

  async getPlayedGames(
    params?: PlayedGamesQuery,
  ): Promise<ApiResponse<PlayedGamesResponse>> {
    const result: ApiResponse<PlayedGamesResponse> = {
      data: null,
      status: false,
      message: "",
    };
    try {
      let url = "/players/me/games";
      if (params) {
        const searchParams = new URLSearchParams();
        if (params.days !== undefined && params.days !== null) {
          searchParams.append("days", params.days.toString());
        }
        if (params.limit !== undefined && params.limit !== null) {
          searchParams.append("limit", params.limit.toString());
        }
        if (params.from) searchParams.append("from", params.from);
        if (params.to) searchParams.append("to", params.to);
        if (params.provider) searchParams.append("provider", params.provider);
        if (params.gameName) searchParams.append("gameName", params.gameName);
        if (params.forceRefresh) searchParams.append("forceRefresh", "true");

        const queryString = searchParams.toString();
        if (queryString) url += `?${queryString}`;
      }
      const { data } = await this.httpClient.get({ url });
      const response = data as ApiResponse<PlayedGamesResponse>;
      if (response?.status) result.status = true;
      result.data = response.data;
      result.message = response.message;
      return result;
    } catch (error) {
      return handleApiError(error, result);
    }
  }

  // ── Player Missions ──

  async getPlayerMissions(
    playerId: number,
    params?: { take?: number; skip?: number },
  ): Promise<PaginatedApiResponse<UserMissionBasic[]>> {
    const result: PaginatedApiResponse<UserMissionBasic[]> = {
      data: null,
      status: false,
      message: "",
      meta: null,
    };
    try {
      let url = `/players/${playerId}/missions`;
      if (params) {
        const searchParams = new URLSearchParams();
        if (params.take !== undefined && params.take !== null) {
          searchParams.append("take", params.take.toString());
        }
        if (params.skip !== undefined && params.skip !== null) {
          searchParams.append("skip", params.skip.toString());
        }
        const queryString = searchParams.toString();
        if (queryString) url += `?${queryString}`;
      }
      const { data } = await this.httpClient.get({ url });
      const response = data as PaginatedApiResponse<UserMissionBasic[]>;
      if (response?.status) result.status = true;
      result.data = response.data;
      result.message = response.message;
      result.meta = response.meta ?? null;
      return result;
    } catch (error) {
      return handleApiError(error, result) as unknown as PaginatedApiResponse<
        UserMissionBasic[]
      >;
    }
  }

  async getPlayerMissionById(
    playerId: number,
    userMissionId: number,
  ): Promise<ApiResponse<UserMissionWithSteps>> {
    const result: ApiResponse<UserMissionWithSteps> = {
      data: null,
      status: false,
      message: "",
    };
    try {
      const { data } = await this.httpClient.get({
        url: `/players/${playerId}/missions/${userMissionId}`,
      });
      const response = data as ApiResponse<UserMissionWithSteps>;
      if (response?.status) result.status = true;
      result.data = response.data;
      result.message = response.message;
      return result;
    } catch (error) {
      return handleApiError(error, result);
    }
  }

  async startMission(
    playerId: number,
    missionId: number,
  ): Promise<ApiResponse<UserMissionBasic>> {
    const result: ApiResponse<UserMissionBasic> = {
      data: null,
      status: false,
      message: "",
    };
    try {
      const { data } = await this.httpClient.post({
        url: `/players/${playerId}/missions/${missionId}/start`,
      });
      const response = data as ApiResponse<UserMissionBasic>;
      if (response?.status) result.status = true;
      result.data = response.data;
      result.message = response.message;
      return result;
    } catch (error) {
      return handleApiError(error, result);
    }
  }

  async submitStep(
    playerId: number,
    userMissionId: number,
    stepId: number,
    data: FormData,
  ): Promise<ApiResponse<StepSubmissionItem>> {
    const result: ApiResponse<StepSubmissionItem> = {
      data: null,
      status: false,
      message: "",
    };
    try {
      const { data: response } = await this.httpClient.post({
        url: `/players/${playerId}/missions/${userMissionId}/steps/${stepId}/submit`,
        body: data,
      });
      const responseData = response as ApiResponse<StepSubmissionItem>;
      if (responseData?.status) result.status = true;
      result.data = responseData.data;
      result.message = responseData.message;
      return result;
    } catch (error) {
      return handleApiError(error, result);
    }
  }

  // ── Levels Endpoints for Players / Web ──

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
        if (params.take !== undefined && params.take !== null) {
          searchParams.append("take", params.take.toString());
        }
        if (params.skip !== undefined && params.skip !== null) {
          searchParams.append("skip", params.skip.toString());
        }
        if (params.name?.trim()) {
          searchParams.append("name", params.name.trim());
        }
        if (params.bonus) {
          searchParams.append("bonus", params.bonus.toString());
        }
        if (
          params.minCoins !== undefined &&
          !Number.isNaN(Number(params.minCoins))
        ) {
          searchParams.append("minCoins", params.minCoins.toString());
        }
        if (
          params.maxCoins !== undefined &&
          !Number.isNaN(Number(params.maxCoins))
        ) {
          searchParams.append("maxCoins", params.maxCoins.toString());
        }
        if (
          params.minExperience !== undefined &&
          !Number.isNaN(Number(params.minExperience))
        ) {
          searchParams.append("minExperience", params.minExperience.toString());
        }
        if (
          params.maxExperience !== undefined &&
          !Number.isNaN(Number(params.maxExperience))
        ) {
          searchParams.append("maxExperience", params.maxExperience.toString());
        }
        if (params.sortOrder) {
          searchParams.append("sortOrder", params.sortOrder);
        }

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

  async getNextLevel(currentExperience: number): Promise<BackendLevel | null> {
    try {
      const res = await this.getLevels({
        minExperience: currentExperience + 1,
        sortOrder: "ASC",
        take: 1,
      });
      if (res.status && res.data && res.data.length > 0) {
        return res.data[0];
      }
      return null;
    } catch {
      return null;
    }
  }
}

export const webApi = new ApiWebGanaya(httpClient);
export default webApi;
