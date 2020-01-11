import axios, { AxiosAdapter, AxiosResponse } from "axios";
// import * as rm from "typed-rest-client/RestClient";
const JSON5 = require("json5");

export class HexPackage {
  name: string;
  requirements: string | undefined;

  constructor(name: string, requirements: string | undefined) {
    this.name = name;
    this.requirements = requirements;
  }

  async details(): Promise<Details | undefined> {
    console.log("------details");
    console.log("name: " + this.name);
    const r: DetailsResponse | null = await this.apiResponseJson();
    if (r === null) {
      return undefined;
    }

    const details: Details = {
      name: r.name,
      description: r.meta.description,
      url: r.url,
      htmlUrl: r.html_url,
      docsHtmlUrl: r.docs_html_url,
      latestVersion: r.releases[0].version
    };

    return details;
  }

  async apiResponseJson(): Promise<DetailsResponse | null> {
    console.log("------apiResponseData");
    const apiUrl = `https://hex.pm/api/packages/${this.name}`;

    const response = await axios.get<DetailsResponse>(apiUrl, {
      headers: { "User-Agent": "VS Code Hex Package Lens extension" },
      responseType: "json"
    });
    console.log("1");
    if (response.status !== 200) {
      return null;
    }
    console.log("2");
    console.log(response.data);
    // const json = JSON5.parse(response.data);
    console.log("3");
    // return json;
    return response.data;
  }
}

export interface Details {
  name: string;
  description: string;
  url: string;
  htmlUrl: string;
  docsHtmlUrl: string;
  latestVersion: string;
}

interface DetailsResponse {
  name: string;
  meta: { description: string };
  url: string;
  html_url: string;
  docs_html_url: string;
  releases: { url: string; version: string }[];
}

// EXAMPLE WITH PLUG
//
// "{
//   "name": "plug",
//   "url": "https://hex.pm/api/packages/plug",
//   "html_url": "https://hex.pm/packages/plug",
//   "docs_html_url": "https://hexdocs.pm/plug",
//   "meta": {
//     "links": {"GitHub": "https://github.com/elixir-lang/plug"},
//     "licenses": ["Apache 2"],
//     "description": "A specification and conveniences for composable modules in between web applications"
//   },
//   "downloads": {
//     "all": 43,
//     "week": 14,
//     "day": 2
//   },
//   "releases": [{
//     "version": "0.4.1",
//     "url": "https://hex.pm/api/packages/plug/releases/0.4.1",
//   }],
//   "inserted_at": "2015-03-24T20:31:35Z",
//   "updated_at": "2015-04-02T04:55:41Z"
// }"
