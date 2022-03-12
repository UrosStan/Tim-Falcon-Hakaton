import { ErrorStatusCode } from '../utils/status-codes';
import { UserRepository } from '../repository/user.repository';
import { Request, Response } from "express";
import { sendResponse } from '../utils/wrappers/response-wrapper';
import { SuccessStatusCode } from '../utils/status-codes';

export class UserController{

    getAllUsers = async (request: Request, response: Response) =>{
        try{
            const users = await UserRepository.getAll()
            return sendResponse(response, 200, SuccessStatusCode.Success, users)
        }catch(error){
            console.log(error);
            return sendResponse(response, 500, ErrorStatusCode.Failure, error);
        }
    }

    getUserById = async (request: Request, response: Response) =>{
        const { id } = request.params;
        try{
            const user = await UserRepository.findById(id)
            if(!user) return sendResponse(response, 404, ErrorStatusCode.UserNotFound)
            return sendResponse(response, 200, SuccessStatusCode.Success, user)
        }catch(error){
            console.log(error);
            return sendResponse(response, 500, ErrorStatusCode.Failure, error);
        }
    }
    
    deleteUserById = async (request: Request, response: Response) =>{
        const { id } = request.params;
        try{
            await UserRepository.deleteById(id)
            return sendResponse(response, 200, SuccessStatusCode.Success)
        }catch(error){
            console.log(error);
            return sendResponse(response, 500, ErrorStatusCode.Failure, error);
        }
    }
}