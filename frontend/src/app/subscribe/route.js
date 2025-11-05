export async function POST(request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return Response.json({ error: "Email is required" }, { status: 400 });
    }

    console.log("✅ New subscriber:", email);

    return Response.json({ success: true, message: "Subscribed successfully" });
  } catch (error) {
    console.error("❌ Error:", error);
    return Response.json({ error: "Something went wrong" }, { status: 500 });
  }
}

export async function GET() {
  return Response.json({ message: "Subscribe API is working 🚀" });
}
