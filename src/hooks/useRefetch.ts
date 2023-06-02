import { useQueryClient } from "@tanstack/react-query";

export const useRefetch = async () => {
    const queryClient = useQueryClient();

    await queryClient.resetQueries(["coordinates"]);
    await queryClient.resetQueries(["location"]);
    await queryClient.resetQueries(["weather"]);
    await queryClient.resetQueries(["temperature"]);

    queryClient.refetchQueries(["weather", "temperature"]);
};
