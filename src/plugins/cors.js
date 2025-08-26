import cors from "@fastify/cors";

export const registerCors = async (fastify) => {
  await fastify.register(cors, {
    origin: true,
    credentials: true,
  });
};
