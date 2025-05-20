import React, {useEffect} from 'react';
import {Button} from "../components/ui/button";
import {CheckCircle, ArrowRight, Activity, Users, BarChart2, Shield, Loader2} from "lucide-react";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "../components/ui/card";
import {Link} from 'react-router-dom';
import {useLogin} from "../hooks/useLogin";
import {useMainContext} from "../context/MainContext";
import {useRegister} from "../hooks/useRegister";

const Home = () => {

    const {
        loading: loadingLogin,
        user: userLogin,
        token: tokenLogin,
        result: resultLogin,
        error: errorLogin,
        login
    } = useLogin();
    const {
        loading: loadingRegister,
        user: userRegister,
        token: tokenRegister,
        result: resultRegister,
        error: errorRegister,
        register
    } = useRegister()

    const {user} = useMainContext();


    return (
        <div>

            <main className="flex-1">
                <section className="w-full py-10 md:py-10 lg:py-10 xl:py-10">
                    <div className="w-full px-4 md:px-6">
                        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
                            <div className="flex flex-col justify-center space-y-4">
                                <div className="space-y-2">
                                    <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                                        Professional Ergonomics Assessment Made Simple
                                    </h1>
                                    <p className="max-w-[600px] text-muted-foreground md:text-xl">
                                        Evaluate workplace ergonomics with industry-standard OWAS and REBA assessments
                                        to prevent injuries
                                        and improve productivity.
                                    </p>
                                </div>
                                {!user && (
                                    <div className="flex flex-col gap-2 min-[400px]:flex-row">
                                        <Link to="/signin">
                                            <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700">
                                                Get Started
                                                <ArrowRight className="ml-2 h-4 w-4"/>
                                            </Button>
                                        </Link>
                                        <Button
                                            size="lg"
                                            variant="outline"
                                            onClick={async () => {
                                                try {
                                                    await register(
                                                        "test",
                                                        "jesus123",
                                                        "test@gmail.com",
                                                        "admin"
                                                    );
                                                } catch (e) {
                                                    console.warn("Registro falló, se continúa con login");
                                                } finally {
                                                    try {
                                                        await login("test@gmail.com", "jesus123");
                                                    } catch (e) {
                                                        console.error("Error al hacer login:", e);
                                                    }
                                                }
                                            }}
                                            disabled={loadingLogin || loadingRegister}
                                        >
                                            {(loadingLogin || loadingRegister) ? <Loader2 className="animate-spin" /> : "Request Demo"}
                                        </Button>

                                    </div>
                                )}
                            </div>
                            <img
                                // src="https://picsum.photos/550/550"
                                src={"/assets/ergonomia.png"}
                                width={550}
                                height={550}
                                alt="Ergonomic workplace assessment"
                                className="mx-auto aspect-square overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
                            />
                        </div>
                    </div>
                </section>

                <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
                    <div className="px-4 md:px-6">
                        <div className="flex flex-col items-center justify-center space-y-4 text-center">
                            <div className="space-y-2">
                                <div
                                    className="inline-block rounded-lg bg-emerald-100 px-3 py-1 text-sm text-emerald-700">
                                    Our Assessment Tools
                                </div>
                                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                                    Industry-Standard Ergonomic Evaluations
                                </h2>
                                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                                    Our platform offers comprehensive ergonomic assessment tools to help identify and
                                    mitigate workplace
                                    risks.
                                </p>
                            </div>
                        </div>
                        <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
                            <Card className="border-2 border-emerald-100">
                                <CardHeader>
                                    <CardTitle className="text-2xl">OWAS Assessment</CardTitle>
                                    <CardDescription>Ovako Working Posture Analysis System</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className={"w-[400px] h-[400px] mx-auto"}>
                                        <img
                                            // src="https://picsum.photos/550/550"
                                            src={"/assets/owas.png"}
                                            width={400}
                                            height={200}
                                            alt="OWAS assessment illustration"
                                            className=" rounded-lg object-cover h-full w-full"
                                        />
                                    </div>
                                        <p>
                                            OWAS evaluates the risk of musculoskeletal disorders based on postures of
                                            the
                                            back, arms, and legs,
                                            along with the weight of the load handled.
                                        </p>
                                        <ul className="space-y-2">
                                            <li className="flex items-center">
                                                <CheckCircle className="mr-2 h-5 w-5 text-emerald-600"/>
                                                <span>Identifies harmful working postures</span>
                                            </li>
                                            <li className="flex items-center">
                                                <CheckCircle className="mr-2 h-5 w-5 text-emerald-600"/>
                                                <span>Categorizes postures into 4 action categories</span>
                                            </li>
                                            <li className="flex items-center">
                                                <CheckCircle className="mr-2 h-5 w-5 text-emerald-600"/>
                                                <span>Prioritizes corrective measures</span>
                                            </li>
                                        </ul>
                                </CardContent>
                                <CardFooter>
                                    {!user && (
                                        <Link to="/signin">
                                            <Button variant="outline" className="w-full">
                                                Apply OWAS evaluation
                                                <ArrowRight className="ml-2 h-4 w-4"/>
                                            </Button>
                                        </Link>
                                    )}
                                    {user && (
                                        /* Link to OWAS evaluation page */
                                        <Link to="/evaluations/owas">
                                            <Button variant="outline" className="w-full">
                                                Apply OWAS evaluation
                                                <ArrowRight className="ml-2 h-4 w-4"/>
                                            </Button>
                                        </Link>
                                    )}
                                </CardFooter>
                            </Card>
                            <Card className="border-2 border-emerald-100">
                                <CardHeader>
                                    <CardTitle className="text-2xl">REBA Assessment</CardTitle>
                                    <CardDescription>Rapid Entire Body Assessment</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className={"w-[400px] h-[400px] mx-auto"}>
                                    {/* Image for REBA assessment */}
                                    <img
                                        // src="https://picsum.photos/550/550"
                                        src={"/assets/reba.png"}
                                        width={400}
                                        height={200}
                                        alt="REBA assessment illustration"
                                        className=" rounded-lg object-cover w-full h-full"
                                    />
                                    </div>
                                    <p>
                                        REBA provides a systematic process to evaluate whole body postural MSD and risks
                                        associated with job
                                        tasks.
                                    </p>
                                    <ul className="space-y-2">
                                        <li className="flex items-center">
                                            <CheckCircle className="mr-2 h-5 w-5 text-emerald-600"/>
                                            <span>Analyzes neck, trunk, leg, arm, and wrist positions</span>
                                        </li>
                                        <li className="flex items-center">
                                            <CheckCircle className="mr-2 h-5 w-5 text-emerald-600"/>
                                            <span>Considers coupling, load, and activity factors</span>
                                        </li>
                                        <li className="flex items-center">
                                            <CheckCircle className="mr-2 h-5 w-5 text-emerald-600"/>
                                            <span>Generates risk scores with action recommendations</span>
                                        </li>
                                    </ul>
                                </CardContent>
                                <CardFooter>
                                    {!user && (
                                        <Link to="/signin">
                                            <Button variant="outline" className="w-full">
                                                Apply REBA evaluation
                                                <ArrowRight className="ml-2 h-4 w-4"/>
                                            </Button>
                                        </Link>
                                    )}
                                    {user && (
                                        <Link to="/evaluations/reba">
                                            <Button variant="outline" className="w-full">
                                                Apply REBA evaluation
                                                <ArrowRight className="ml-2 h-4 w-4"/>
                                            </Button>
                                        </Link>
                                    )}
                                </CardFooter>
                            </Card>
                        </div>
                    </div>
                </section>

                <section id="benefits" className="w-full py-12 md:py-24 lg:py-32">
                    <div className="px-4 md:px-6">
                        <div className="flex flex-col items-center justify-center space-y-4 text-center">
                            <div className="space-y-2">
                                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                                    Why Choose Our Ergonomic Assessment Platform?
                                </h2>
                                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                                    Our comprehensive solution helps organizations improve workplace safety and employee
                                    wellbeing.
                                </p>
                            </div>
                        </div>
                        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
                            <Card>
                                <CardHeader className="flex flex-row items-center gap-4">
                                    <Activity className="h-8 w-8 text-emerald-600"/>
                                    <CardTitle>Reduce Workplace Injuries</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p>
                                        Identify and address ergonomic risk factors before they lead to musculoskeletal
                                        disorders and
                                        injuries.
                                    </p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center gap-4">
                                    <BarChart2 className="h-8 w-8 text-emerald-600"/>
                                    <CardTitle>Increase Productivity</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p>
                                        Optimize workstations and processes to enhance employee comfort, efficiency, and
                                        overall
                                        productivity.
                                    </p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center gap-4">
                                    <Users className="h-8 w-8 text-emerald-600"/>
                                    <CardTitle>Improve Employee Wellbeing</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p>Demonstrate commitment to employee health and safety, boosting morale and
                                        reducing absenteeism.</p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center gap-4">
                                    <Shield className="h-8 w-8 text-emerald-600"/>
                                    <CardTitle>Ensure Regulatory Compliance</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p>
                                        Meet occupational health and safety requirements with documented ergonomic
                                        assessments and
                                        interventions.
                                    </p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center gap-4">
                                    <BarChart2 className="h-8 w-8 text-emerald-600"/>
                                    <CardTitle>Data-Driven Decisions</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p>
                                        Access comprehensive reports and analytics to prioritize ergonomic improvements
                                        based on risk
                                        levels.
                                    </p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center gap-4">
                                    <Activity className="h-8 w-8 text-emerald-600"/>
                                    <CardTitle>Cost Reduction</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p>
                                        Lower workers' compensation costs and reduce expenses related to workplace
                                        injuries and lost
                                        productivity.
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </section>

                {/*<section id="demo" className="w-full py-12 md:py-24 lg:py-32 bg-emerald-50">*/}
                {/*    <div className="px-4 md:px-6">*/}
                {/*        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">*/}
                {/*            <div className="flex flex-col justify-center space-y-4">*/}
                {/*                <div className="space-y-2">*/}
                {/*                    <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">See Our Platform in*/}
                {/*                        Action</h2>*/}
                {/*                    <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">*/}
                {/*                        Request a personalized demo to see how our ergonomic assessment tools can*/}
                {/*                        benefit your organization.*/}
                {/*                    </p>*/}
                {/*                </div>*/}
                {/*                <div className="flex flex-col space-y-2 md:flex-row md:space-x-4 md:space-y-0">*/}
                {/*                    <Link to="/contact">*/}
                {/*                        <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700">*/}
                {/*                            Request Demo*/}
                {/*                        </Button>*/}
                {/*                    </Link>*/}
                {/*                    <Link to="/resources">*/}
                {/*                        <Button size="lg" variant="outline">*/}
                {/*                            View Resources*/}
                {/*                        </Button>*/}
                {/*                    </Link>*/}
                {/*                </div>*/}
                {/*            </div>*/}
                {/*            <div className="space-y-4 lg:space-y-6">*/}
                {/*                <form className="grid gap-4">*/}
                {/*                    <div className="grid grid-cols-2 gap-4">*/}
                {/*                        <div className="space-y-2">*/}
                {/*                            <label*/}
                {/*                                htmlFor="first-name"*/}
                {/*                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"*/}
                {/*                            >*/}
                {/*                                First name*/}
                {/*                            </label>*/}
                {/*                            <input*/}
                {/*                                id="first-name"*/}
                {/*                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"*/}
                {/*                                placeholder="Enter your first name"*/}
                {/*                            />*/}
                {/*                        </div>*/}
                {/*                        <div className="space-y-2">*/}
                {/*                            <label*/}
                {/*                                htmlFor="last-name"*/}
                {/*                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"*/}
                {/*                            >*/}
                {/*                                Last name*/}
                {/*                            </label>*/}
                {/*                            <input*/}
                {/*                                id="last-name"*/}
                {/*                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"*/}
                {/*                                placeholder="Enter your last name"*/}
                {/*                            />*/}
                {/*                        </div>*/}
                {/*                    </div>*/}
                {/*                    <div className="space-y-2">*/}
                {/*                        <label*/}
                {/*                            htmlFor="email"*/}
                {/*                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"*/}
                {/*                        >*/}
                {/*                            Email*/}
                {/*                        </label>*/}
                {/*                        <input*/}
                {/*                            id="email"*/}
                {/*                            type="email"*/}
                {/*                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"*/}
                {/*                            placeholder="Enter your email"*/}
                {/*                        />*/}
                {/*                    </div>*/}
                {/*                    <div className="space-y-2">*/}
                {/*                        <label*/}
                {/*                            htmlFor="company"*/}
                {/*                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"*/}
                {/*                        >*/}
                {/*                            Company*/}
                {/*                        </label>*/}
                {/*                        <input*/}
                {/*                            id="company"*/}
                {/*                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"*/}
                {/*                            placeholder="Enter your company name"*/}
                {/*                        />*/}
                {/*                    </div>*/}
                {/*                    <div className="space-y-2">*/}
                {/*                        <label*/}
                {/*                            htmlFor="message"*/}
                {/*                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"*/}
                {/*                        >*/}
                {/*                            Message*/}
                {/*                        </label>*/}
                {/*                        <textarea*/}
                {/*                            id="message"*/}
                {/*                            className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"*/}
                {/*                            placeholder="Tell us about your ergonomic assessment needs"*/}
                {/*                        />*/}
                {/*                    </div>*/}
                {/*                    <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700">*/}
                {/*                        Submit Request*/}
                {/*                    </Button>*/}
                {/*                </form>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</section>*/}
            </main>
            <footer className="w-full border-t bg-background py-6">
                <div className="container flex flex-col items-center justify-between gap-4 px-4 md:flex-row md:px-6">
                    <div className={"h-[36px] flex justify-center items-center"}>
                        <img className={"h-full scale-down"} alt={"logo"} src={"/assets/logo.png"}/>
                        <span className={"text-xl font-bold"}>ERGONOMIA</span>
                    </div>
                    <p className="text-center text-sm text-muted-foreground md:text-left">
                        &copy; {new Date().getFullYear()} ErgonomIA. All rights reserved.
                    </p>
                    <div className="flex gap-4">
                        <Link className="text-sm font-medium hover:underline underline-offset-4" to="#">
                            Privacy Policy
                        </Link>
                        <Link className="text-sm font-medium hover:underline underline-offset-4" to="#">
                            Terms of Service
                        </Link>
                        <Link className="text-sm font-medium hover:underline underline-offset-4" to="#">
                            Contact
                        </Link>
                    </div>
                </div>
            </footer>

        </div>
    );
};

export default Home;