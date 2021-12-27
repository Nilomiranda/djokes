import { Joke } from "@prisma/client";
import { Link, LoaderFunction, useLoaderData } from "remix";
import { db } from "~/utils/db.server";

type LoaderData = Joke;

export const loader: LoaderFunction = async ({ params }) => {
    const joke: LoaderData | null = await db.joke.findFirst({
        where: {
            id: params.jokeId
        }
    })

    if (!joke) {
        throw new Error("Joke now found");
    }

    return joke;
}

export default function JokeRoute() {
    const joke = useLoaderData<LoaderData>()

    return (
        <div>
            <p>{joke.name}</p>
            <p>
                {joke.content}
            </p>

            <Link to=".">{joke.name} Permalink</Link>
        </div>
    )
}