import { useState } from "react"
import { useForm } from '@mantine/form';
import { Button, Textarea, PasswordInput, Grid, Select, Badge, Group } from '@mantine/core';
import CopyTextIcon from "./CopyTextIcon";
import sha256 from 'crypto-js/sha256';
// import { sha256 } from "~utilis/sha256";

import toast, { Toaster } from "react-hot-toast";
import { MantineProvider } from '@mantine/core';
// import { IconXboxX } from "@tabler/icons";


export function Main({ name = "Extension" }) {

    try{
        const [ hashedPassword, setHashedPassword ] = useState<string>("");
        const [ showPwLength, setShowPwLength ] = useState<string>("Full");
    
        const form = useForm({
            initialValues: {
                domain: "www.google.com",
                password: "",
            },
            validate: {
                domain: (value) => (value.length >= 1) ? null : 'Invalid domain',
                password: (value) => (value.length >= 1) ? null : 'Invalid password',
            },
        });
    
        function hashPw(values: {domain: string, password: string}){
            let finalStr = values.domain.trim() + values.password
            setHashedPassword(sha256(finalStr));
            // setHashedPassword(sha256(finalStr));
            toast.success('Successfully to hash!')
        }

        return (
            <MantineProvider theme={{ colorScheme: 'dark' }} withGlobalStyles withNormalizeCSS>
            <div><Toaster/></div>
    
            <div style={{ padding: 12, width: "400px" }} >
    
                <Group position="center" mb={6}>
                    <Badge 
                        size="lg"
                        variant="gradient"
                        gradient={{ from: 'indigo', to: 'cyan' }}
                    >
                        Password Hasher
                    </Badge>
                </Group>
                
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
    
                    <Button 
                        mt={20} 
                        variant="gradient" 
                        gradient={{ from: 'indigo', to: 'cyan', deg: 60 }} 
                        fullWidth 
                        type="submit"
                    >
                        Encode
                    </Button>
    
                </form>
    
                { hashedPassword !== "" && (
                    <>
                    <Select
                        mt={6}
                        label="Length"
                        data={[
                            { value: 'Full', label: 'Full' },
                            ...[8,16,24,32,40,48,56].map( v => { return { value: v+"", label: v+"" }} )
                        ]}
                        value={showPwLength}
                        onChange={setShowPwLength}
                    />

                    <Grid mt={6} mb={6}>
                        <Grid.Col span={10}>
                            <PasswordInput 
                                label="Hashed Password" 
                                value={
                                    showPwLength === "Full" 
                                    ? hashedPassword 
                                    : String(hashedPassword).slice(0, +showPwLength)
                                }
                            />
                        </Grid.Col>
                        <Grid.Col span={2}>
                            <CopyTextIcon 
                                hashedPassword={
                                    showPwLength === "Full" 
                                    ? hashedPassword 
                                    : String(hashedPassword).slice(0, +showPwLength)
                                }
                            />
                        </Grid.Col>
                    </Grid>      
                    </>
                )}
                
            </div>
            </MantineProvider>
        )
    }
    catch(err:any){
        return (
            <h3>{ err.message }</h3>
        )
    }

}

// 89a1fe75eb7b02031bd6904375b71b4829d6568bfb24dfba982b09ad4e3fe462

// 89a1fe75eb7b02031bd6904375b71b4829d6568bfb24dfba982b09ad4e3fe462
// 89a1fe75eb7b02031bd6904375b71b4829d6568bfb24dfba982b09ad4e3fe462