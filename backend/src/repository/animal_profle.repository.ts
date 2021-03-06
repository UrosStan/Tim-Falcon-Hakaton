import { EntityManager, getManager } from "typeorm";
import { AnimalProfile } from "../entities/AnimalProfile.entity";

export class _AnimalProfileRepository{

    public async getAll(entityManager?: EntityManager) {
        const manager = entityManager || getManager();

        let animalProfile;
        animalProfile = await manager.find(AnimalProfile)
        animalProfile.forEach(element => {
            element.geoData = JSON.parse(element.geoData)
        }); 
        return animalProfile
        
    }
    
    public async deleteById(id: number, entityManager?: EntityManager) {
        const manager = entityManager || getManager();
        return manager.delete(AnimalProfile, id)
    }

    public async findByIdOrCreate(animalProfileData: AnimalProfile, entityManager?: EntityManager) {
        if(!animalProfileData.id) return ;
        const animalProfile = await this.findById(animalProfileData.id)
        if(animalProfile) return animalProfile;

        await this.addNewAnimalProfile(new AnimalProfile(animalProfileData));
    }

    public async findById(animalProfileId: number, entityManager?: EntityManager): Promise<AnimalProfile|undefined>{
        const manager = entityManager || getManager();
        const animalProfile = await manager.findOne(AnimalProfile, animalProfileId,{relations: ['species', 'users']})
        animalProfile?.geoData && (animalProfile.geoData = animalProfile?.geoData)
        return animalProfile
    }

    // public async findByEmail(email: string, entityManager?: EntityManager): Promise<Species|undefined>{
    //     const manager = entityManager || getManager();
    //     return await manager.findOne(User, {email: email})
    // }

    public async addNewAnimalProfile(newAnimalProfile: AnimalProfile, entityManager?: EntityManager) {
        const manager = entityManager || getManager();
        return await manager.save(AnimalProfile, newAnimalProfile)
    }

}

export const AnimalProfileRepository = new _AnimalProfileRepository();