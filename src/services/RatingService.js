import { supabase } from "../components/supabaseConfig";

export class RatingService{
    static async getAllRatings(){
        const {data, error} = await supabase
            .from('Rating')
            .select('*');

        if (error) throw error;
        return data;
    }

    static async getRatingByGame(gameId){
        const {data, error} = await supabase
            .from('Rating')
            .select('*')
            .eq('id_juego', Number(gameId));

        if (error) throw error;
        return data;
    }


}