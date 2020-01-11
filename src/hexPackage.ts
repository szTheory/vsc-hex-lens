import axios from "axios";

export interface Details {
  version: string;
  info: string;
  homepage_uri: string;
}

export class HexPackage {
  name: string;
  requirements: string | undefined;

  constructor(name: string, requirements: string | undefined) {
    this.name = name;
    this.requirements = requirements;
  }

  async details(): Promise<Details | undefined> {
    const url = `https://private-anon-0e4ab44d56-hexpm.apiary-mock.com/packages/${this.name}`;
    // const url = `https://rubygems.org/api/v1/gems/${this.name}.json`;
    const res = await axios.get<Details>(url);
    if (res.status === 200) {
      return res.data;
    }
    return undefined;
  }
}
