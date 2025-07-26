import AuthenticationService from "../services/authenticationServices.js";
import TeamServices from "../services/teamServices.js";

class TeamController{
    constructor() {
        this.authenticationService = new AuthenticationService();
        this.TeamServices = new TeamServices();
    }

    async getTeam(req, res) {
        try {
            const authHeader = req.headers.authorization; 
            if (!authHeader || !authHeader.startsWith("Bearer ")) {
                return res.status(401).json({ error: true, message: "Unauthorized" });  
            }

            const token = authHeader.replace("Bearer ", "");
            const user = await this.authenticationService.getCurrentUser(token);
            if (!user) {
                return res.status(401).json({ error: true, message: "Unauthorized" });
            }

            const { teamId } = req.body;
            if (!teamId) {
                return res.status(400).json({ error: true, message: "Team ID is required" });
            }

            const teams = await this.TeamServices.getTeam(teamId);
                
            return res.status(200).json({success: true, user: user, teams: teams});
        }
        catch (error) {
            console.error("GET team/getTeam, Something Went Wrong:", error);
            return res.status(400).json({ error: true, message: error.message });
        }
    }

    async createTeam(req, res) {
    }

    async removeTeam(req, res) {
    }

    async updateTeam(req, res) {
    }
}

export default TeamController;