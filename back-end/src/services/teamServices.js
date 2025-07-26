import Team from "../models/team.js";

export default class TaskService {

    async getTeam(teamId) {
        try {
            const query = teamId ? { _id: teamId } : {};
            const tasks = await Team.find(query).sort({ createdAt: -1 }).limit(20).lean();
            return tasks;
        }
        catch (error) {
            console.error("Error in getTeam:", error);
            throw new Error("Error fetching team: " + error.message);
        }
    }

    async createTeam(teamData) {
    }

    async removeTeam(teamId) {
    }

    async updateTeam(teamId, teamData) {  
    }
}
