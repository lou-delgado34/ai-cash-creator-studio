<a
  href={`/checkout?plan=${plan.name.toLowerCase().replace("+ / ", "").replace(" ", "-")}`}
  className={`mt-6 block w-full rounded-xl py-3 text-center font-semibold ${
    plan.name === "Admin"
      ? "bg-green-600"
      : "bg-blue-600 hover:bg-blue-500"
  }`}
>
  {plan.name === "Admin" ? "Admin Access" : "Upgrade"}
</a>