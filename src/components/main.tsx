import { useState } from "react"
import { Button, Textarea, PasswordInput, Grid } from '@mantine/core';
import { useForm } from '@mantine/form';

import { IconCheck, IconCopy } from "@tabler/icons";
import CopyTextIcon from "./CopyTextIcon";
import sha256 from 'crypto-js/sha256';

export function Main({ name = "Extension" }) {
  
    const [ domain, setDomain ] = useState<string>("");
    const [ password, setPassword ] = useState<string>("");

    const form = useForm({
        initialValues: {
            domain: "https://www.google.com/",
            password: "",
        },
    
        validate: {
            domain: (value) => (value.length >= 1) ? null : 'Invalid domain',
            password: (value) => (value.length >= 1) ? null : 'Invalid password',
        },
    });

    const [ hashedPassword, setHashedPassword ] = useState<string>("");

    function hashPw(values: {domain: string, password: string}){
        let finalStr = values.domain.trim() + values.password
        setHashedPassword(sha256(finalStr))
    }

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                padding: 16,
                width: "300px"
            }}
        >
            <form onSubmit={form.onSubmit((values) => hashPw(values))}>
            <Textarea 
                label="Domain"
                withAsterisk
                minRows={2}
                {...form.getInputProps('domain')}
            />

            <PasswordInput 
                label="Password"
                withAsterisk 
                placeholder="Password" 
                mt={6}
                {...form.getInputProps('password')}
            />

            <Button mt={20} type="submit">Encode</Button>
            </form>

            { hashedPassword !== "" && (
                <>
                <Grid mt={6}>
                    <Grid.Col span={10}>
                        <PasswordInput 
                            label="Hashed Password" 
                            value={hashedPassword}
                        />
                    </Grid.Col>
                    <Grid.Col span={2}>
                        <CopyTextIcon hashedPassword={hashedPassword}/>
                    </Grid.Col>
                </Grid>  
                </>
            )}
            
        </div>
    )
}


// 76d442f15d4e25707c0746162d4c415db2480560bb775308549a6f06f3d7354e
// 76d442f15d4e25707c0746162d4c415db2480560bb775308549a6f06f3d7354e