//@ts-nocheck

import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Movie from 'App/Models/Movie'
import axios from "axios";
import * as process from "process";

export default class AdminController {
    public async StreamTapeUpload({request, response }: HttpContextContract) {

		console.log("here")
		const streamtape_base_url = 'https://api.streamtape.com'

		const credentials = 	'login=a366485f9b19ef84ed3f&key=june@1603&folder=movies'


		const file = request.file('file')

		const config = {
			method: 'post',
			url: `${streamtape_base_url}/file/ul?${credentials}`,
			headers: {
				'Content-Type': 'multipart/form-data'
			},
			data: file
		}


		try {
			const { data } = await axios(config)
			console.log(data)
			return response.status(200).json({message: 'success', data})
		}

		catch (error) {
			console.log(error)
			return response.status(500).json({message: 'error', error: error.message})
		}


    }


	public async GetProfileImages({request, response }: HttpContextContract) {


		const BASE_URL = request.hostname() ?? process.env.HOST

		const images_names = [1,2,3,4,5,6]

		const images = images_names.map((image) => {
			return `${request.completeUrl()}/${image}.png`
		})

		return response.status(200).json(images)



	}

}
