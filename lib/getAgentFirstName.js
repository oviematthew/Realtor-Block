// This function gets the user first name for each listing
export default function getAgentFirstName(listing, user) {
  if (listing?.createdBy) {
    const emailMatch =
      listing.createdBy === user?.primaryEmailAddress?.emailAddress;

    if (emailMatch) {
      return user?.firstName || "Agent";
    }
  }
  return listing?.firstName || "Agent";
}