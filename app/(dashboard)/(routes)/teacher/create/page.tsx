"use client";
import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// require the user to atleast 1 string input and limit the title to 50 characters max
const formSchema = z.object ({
    title: z.string().min(1, {
        message: "Title is required"
    }).max(50, {
        message: "Maximum length of title reached"
    })

});

const CreatePage = () => {
const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        title: ""
    },
});

const { isSubmitting, isValid } = form.formState;

const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
};

    return ( 
        <div className="max-w-5xl mx-auto flex md:items-center md:justify-center h-full p-6">
            <div>
                <h1>
                    Name the course
                </h1>
                <p className="text-sm text-purple-600">
                    What should be the name of your course?
                </p>
                <Form {...form}>

                </Form>
            </div>
            
        </div>
     );
}
 
export default CreatePage;