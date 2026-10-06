import axios from "axios";

import HttpClient, { handleApiError } from "@shared/libs/httpClient";
import type {
  BackendLevel,
  BackendMission,
  GetLevelsQuery,
  GetMissionsQuery,
} from "@shared/types/admin";
import type {
  ApiResponse,
  HttpClientInterface,
  PaginatedApiResponse,
} from "@shared/types/http";

import { API_URL, LOCAL_STORAGE_KEYS } from "@/constant";
import type {
  GetPlayerChestsProgressQuery,
  PlayerChestClaimResponse,
  PlayerChestJoinResponse,
  PlayerChestProgressItem,
} from "@/types/chests";
import type { LuckyBetGameItem } from "@/types/luckybet";
import type {
  GetMyMissionsQuery,
  MissionRewardResponse,
} from "@/types/missions";
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
        if (params.from?.trim())
          searchParams.append("from", params.from.trim());
        if (params.to?.trim()) searchParams.append("to", params.to.trim());
        if (params.provider?.trim())
          searchParams.append("provider", params.provider.trim());
        if (params.gameName?.trim())
          searchParams.append("gameName", params.gameName.trim());
        if (params.forceRefresh !== undefined) {
          searchParams.append("forceRefresh", params.forceRefresh.toString());
        }
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

  // ── Games Catalog (LuckyBet Backend) ──

  async getGameList(): Promise<ApiResponse<LuckyBetGameItem[]>> {
    const result: ApiResponse<LuckyBetGameItem[]> = {
      data: null,
      status: false,
      message: "",
    };
    try {
      const { data } = await this.httpClient.get({
        url: "/panel/games",
      });
      const response = data as ApiResponse<LuckyBetGameItem[]>;
      if (response?.status) result.status = true;
      result.data = response.data;
      result.message = response.message;
      return result;
    } catch (error) {
      return handleApiError(error, result);
    }
  }

  // ── Missions Catalog & Player Missions ──

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
        if (params.take !== undefined && params.take !== null) {
          searchParams.append("take", params.take.toString());
        }
        if (params.skip !== undefined && params.skip !== null) {
          searchParams.append("skip", params.skip.toString());
        }
        if (params.status !== undefined && params.status !== null) {
          searchParams.append("status", params.status);
        }
        if (params.type !== undefined && params.type !== null) {
          searchParams.append("type", params.type);
        }
        if (params.roomId !== undefined && params.roomId !== null) {
          searchParams.append("roomId", params.roomId.toString());
        }
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

  async getMyMissions(
    params?: GetMyMissionsQuery,
  ): Promise<PaginatedApiResponse<UserMissionWithSteps[]>> {
    const result: PaginatedApiResponse<UserMissionWithSteps[]> = {
      data: null,
      status: false,
      message: "",
      meta: null,
    };
    try {
      let url = "/missions/my-missions";
      if (params) {
        const searchParams = new URLSearchParams();
        if (params.take !== undefined && params.take !== null) {
          searchParams.append("take", params.take.toString());
        }
        if (params.skip !== undefined && params.skip !== null) {
          searchParams.append("skip", params.skip.toString());
        }
        if (params.status !== undefined && params.status !== null) {
          searchParams.append("status", params.status);
        }
        if (params.missionId !== undefined && params.missionId !== null) {
          searchParams.append("missionId", params.missionId.toString());
        }
        if (
          params.orderDirection !== undefined &&
          params.orderDirection !== null
        ) {
          searchParams.append("orderDirection", params.orderDirection);
        }
        const queryString = searchParams.toString();
        if (queryString) url += `?${queryString}`;
      }
      const { data } = await this.httpClient.get({ url });
      const response = data as PaginatedApiResponse<UserMissionWithSteps[]>;
      if (response?.status) result.status = true;
      result.data = response.data;
      result.message = response.message;
      result.meta = response.meta ?? null;
      return result;
    } catch (error) {
      return handleApiError(error, result) as unknown as PaginatedApiResponse<
        UserMissionWithSteps[]
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

  async startMission(
    missionId: number,
  ): Promise<ApiResponse<UserMissionBasic>> {
    const result: ApiResponse<UserMissionBasic> = {
      data: null,
      status: false,
      message: "",
    };
    try {
      const { data } = await this.httpClient.post({
        url: `/missions/${missionId}/start`,
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

  async getUserMissionById(
    userMissionId: number,
  ): Promise<ApiResponse<UserMissionWithSteps>> {
    const result: ApiResponse<UserMissionWithSteps> = {
      data: null,
      status: false,
      message: "",
    };
    try {
      const { data } = await this.httpClient.get({
        url: `/missions/user-missions/${userMissionId}`,
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

  async submitMissionStep(
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
        url: `/missions/user-missions/${userMissionId}/steps/${stepId}/submit`,
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

  async verifyGamePlayStep(
    userMissionId: number,
    stepId: number,
  ): Promise<
    ApiResponse<{
      id: number;
      userMissionId: number;
      missionStepId: number;
      status: string;
    }>
  > {
    const result: ApiResponse<{
      id: number;
      userMissionId: number;
      missionStepId: number;
      status: string;
    }> = {
      data: null,
      status: false,
      message: "",
    };
    try {
      const { data: response } = await this.httpClient.post({
        url: `/missions/user-missions/${userMissionId}/steps/${stepId}/verify`,
      });
      const responseData = response as ApiResponse<{
        id: number;
        userMissionId: number;
        missionStepId: number;
        status: string;
      }>;
      if (responseData?.status) result.status = true;
      result.data = responseData.data;
      result.message = responseData.message;
      return result;
    } catch (error) {
      return handleApiError(error, result);
    }
  }

  // ── Mission Rewards API ──

  async findRewardByUMId(
    userMissionId: number,
  ): Promise<ApiResponse<MissionRewardResponse>> {
    const result: ApiResponse<MissionRewardResponse> = {
      data: null,
      status: false,
      message: "",
    };
    try {
      const { data } = await this.httpClient.get({
        url: `/rewards/${userMissionId}`,
      });
      const response = data as ApiResponse<MissionRewardResponse>;
      if (response?.status) result.status = true;
      result.data = response.data;
      result.message = response.message;
      return result;
    } catch (error) {
      return handleApiError(error, result);
    }
  }

  async claimMissionReward(userMissionId: number): Promise<
    ApiResponse<{
      id: number;
      userMissionId: number;
      status: string;
      coinsAmount: number;
    }>
  > {
    const result: ApiResponse<{
      id: number;
      userMissionId: number;
      status: string;
      coinsAmount: number;
    }> = {
      data: null,
      status: false,
      message: "",
    };
    try {
      const { data } = await this.httpClient.post({
        url: `/rewards/user-missions/${userMissionId}/claim`,
      });
      const response = data as ApiResponse<{
        id: number;
        userMissionId: number;
        status: string;
        coinsAmount: number;
      }>;
      if (response?.status) result.status = true;
      result.data = response.data;
      result.message = response.message;
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
        if (params.roomId) {
          searchParams.append("roomId", params.roomId.toString());
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

  // ── Player Chests Endpoints ──

  async getPlayerChestsProgress(
    params?: GetPlayerChestsProgressQuery,
  ): Promise<ApiResponse<PlayerChestProgressItem[]>> {
    const result: ApiResponse<PlayerChestProgressItem[]> = {
      data: null,
      status: false,
      message: "",
    };
    try {
      let url = "/player-chests/progress";
      if (params) {
        const searchParams = new URLSearchParams();
        if (params.periodType) {
          searchParams.append("periodType", params.periodType);
        }
        if (params.chestId !== undefined && params.chestId !== null) {
          searchParams.append("chestId", params.chestId.toString());
        }
        const queryString = searchParams.toString();
        if (queryString) url += `?${queryString}`;
      }
      const { data } = await this.httpClient.get({ url });
      const response = data as ApiResponse<PlayerChestProgressItem[]>;
      if (response?.status) result.status = true;
      result.data = response.data;
      result.message = response.message;
      return result;
    } catch (error) {
      return handleApiError(error, result);
    }
  }

  async getPlayerChestProgressById(
    chestId: number,
  ): Promise<ApiResponse<PlayerChestProgressItem>> {
    const result: ApiResponse<PlayerChestProgressItem> = {
      data: null,
      status: false,
      message: "",
    };
    try {
      const { data } = await this.httpClient.get({
        url: `/player-chests/${chestId}/progress`,
      });
      const response = data as ApiResponse<PlayerChestProgressItem>;
      if (response?.status) result.status = true;
      result.data = response.data;
      result.message = response.message;
      return result;
    } catch (error) {
      return handleApiError(error, result);
    }
  }

  async joinPlayerChest(
    chestId: number,
  ): Promise<ApiResponse<PlayerChestJoinResponse>> {
    const result: ApiResponse<PlayerChestJoinResponse> = {
      data: null,
      status: false,
      message: "",
    };
    try {
      const { data } = await this.httpClient.post({
        url: `/player-chests/${chestId}/join`,
      });
      const response = data as ApiResponse<PlayerChestJoinResponse>;
      if (response?.status) result.status = true;
      result.data = response.data;
      result.message = response.message;
      return result;
    } catch (error) {
      return handleApiError(error, result);
    }
  }

  async claimPlayerChest(
    chestId: number,
  ): Promise<ApiResponse<PlayerChestClaimResponse>> {
    const result: ApiResponse<PlayerChestClaimResponse> = {
      data: null,
      status: false,
      message: "",
    };
    try {
      const { data } = await this.httpClient.post({
        url: `/player-chests/${chestId}/claim`,
      });
      const response = data as ApiResponse<PlayerChestClaimResponse>;
      if (response?.status) result.status = true;
      result.data = response.data;
      result.message = response.message;
      return result;
    } catch (error) {
      return handleApiError(error, result);
    }
  }
}

export const webApi = new ApiWebGanaya(httpClient);
export default webApi;
