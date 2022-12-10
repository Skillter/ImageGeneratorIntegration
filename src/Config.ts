import fs from "fs";
const configFilePath = __dirname + "\\config.txt"


export class Config {
    constructor(public configVersion: number, public buffSessionID: string) {
        this.configVersion = configVersion;
        this.buffSessionID = buffSessionID;
        this.saveConfig()
        this.updateConfig()
    }

    saveConfig() {
        let json = { 'configVersion': this.configVersion, 'buffSessionID': this.buffSessionID };
        try {
        fs.writeFileSync(
            configFilePath,
            JSON.stringify(json, null, " "),
            {
                encoding: "utf8",
                flag: "wx+" // fail if the file exists
            }
        )
        } catch (err) {
            //surpress 
       }
    }
    updateConfig() {
        let data = fs.readFileSync(
            configFilePath,
            {
                encoding: "utf8",
                flag: "rs"
            }
        )
        let json = JSON.parse(data.toString());
        if (json != null) {
            this.configVersion = json["configVersion"]
            this.buffSessionID = json["buffSessionID"]
        }
    }

}

