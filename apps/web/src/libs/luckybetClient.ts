import axios, { type AxiosInstance } from "axios";

import {
  LUCKYBET_API_URL,
  LUCKYBET_DOMAIN,
  LUCKYBET_VERSION,
} from "@/constant";
import type {
  LuckyBetLoginContent,
  LuckyBetLoginData,
  LuckyBetRequest,
  LuckyBetResponse,
  LuckyBetTerminalInfoContent,
} from "@/types/luckybet";

export class LuckyBetClient {
  private readonly client: AxiosInstance;
  private readonly apiUrl: string;
  private readonly domain: string;
  private readonly version: number;

  constructor(
    apiUrl: string = LUCKYBET_API_URL,
    domain: string = LUCKYBET_DOMAIN,
    version: number = LUCKYBET_VERSION,
  ) {
    this.apiUrl = apiUrl;
    this.domain = domain;
    this.version = version;
    this.client = axios.create({
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      timeout: 15000,
    });
  }

  /**
   * Executes a command against the LuckyBet player API endpoint.
   */
  async executeCommand<TReqData = unknown, TResContent = unknown>(
    cmd: string,
    payload: Record<string, unknown> = {},
  ): Promise<LuckyBetResponse<TResContent>> {
    const body: LuckyBetRequest<TReqData> = {
      cmd,
      version: this.version,
      domain: this.domain,
      ...payload,
    };

    try {
      const response = await this.client.post<LuckyBetResponse<TResContent>>(
        this.apiUrl,
        body,
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data) {
        return error.response.data as LuckyBetResponse<TResContent>;
      }

      return {
        status: "fail",
        errorCode: "network_error",
        error: "Error de conexión con el servidor de LuckyBet.",
      };
    }
  }

  /**
   * Logs in a player using credentials.
   * On success returns { status: "success", token: "<32hex>", content: { language: "es" } }
   */
  async login(
    credentials: LuckyBetLoginData,
  ): Promise<LuckyBetResponse<LuckyBetLoginContent>> {
    return this.executeCommand<LuckyBetLoginData, LuckyBetLoginContent>(
      "authorization",
      {
        type: "login",
        data: credentials,
      },
    );
  }

  /**
   * Checks token validity and retrieves player terminal/profile info.
   * Valid: { status: "success", content: { id, login, cash, currency, ... } }
   * Invalid: { status: "fail", errorCode: "authorize_error", error: "..." }
   */
  async terminalInfo(
    token: string,
    first = false,
  ): Promise<LuckyBetResponse<LuckyBetTerminalInfoContent>> {
    return this.executeCommand<undefined, LuckyBetTerminalInfoContent>(
      "terminalInfo",
      {
        token,
        first,
      },
    );
  }

  /**
   * Logs out the player session.
   */
  async logout(token: string): Promise<LuckyBetResponse<unknown>> {
    return this.executeCommand("userLogout", {
      token,
    });
  }
}

export const luckybetClient = new LuckyBetClient();
