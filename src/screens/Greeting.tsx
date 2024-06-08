
import { useFetchGreetingAuthQuery } from '../services/hello.api.ts';
import RenderError from "../components/RenderError.tsx";

const Greeting = () => {
    const { data, error, isLoading } = useFetchGreetingAuthQuery();

    if (isLoading) return <div>Loading...</div>;

    if (error) return <RenderError error={error} />;

    return <><div>Greeting: {data}</div>
    <div>Data: {JSON.stringify(data)}!</div>
    </>;
};

export default Greeting;

