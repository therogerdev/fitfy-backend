import prisma from "../../../prismaClient.js";

export const activateMembership = async (
  customerEmail: string,
  priceId: string,
  stripeSubscriptionId: string,
  startDate: Date,
  endDate: Date
) => {
  try {
    // Find the athlete by their email
    const athlete = await prisma.athlete.findUnique({
      where: { email: customerEmail }
    });

    if (!athlete) {
      throw new Error("Athlete not found");
    }

    console.log("Creating/updating membership for athlete ID:", athlete.id);

    // Create or update the membership
    const membership = await prisma.membership.create({
        data: {
            type: "SUBSCRIPTION", // Assuming it's a subscription membership
            priceId: priceId,
            stripeSubscriptionId: stripeSubscriptionId,
            startDate: startDate,
            endDate: endDate,
            athleteId: athlete.id
        }
    });
    console.log("Membership created:", membership);

    return membership;
  } catch (error) {
    console.error("Error activating membership:", error);
    throw new Error("Failed to activate membership");
  }
};
