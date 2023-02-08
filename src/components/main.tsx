import { useState } from "react"
import { useForm } from '@mantine/form';
import { Button, Textarea, PasswordInput, Grid, Text, Badge, Group } from '@mantine/core';
import CopyTextIcon from "./CopyTextIcon";
import sha256 from 'crypto-js/sha256';
import toast, { Toaster } from "react-hot-toast";
import { MantineProvider } from '@mantine/core';

export function Main({ name = "Extension" }) {

    const [ hashedPassword, setHashedPassword ] = useState<string>("");

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
        toast.success('Successfully to hash!')
    }

    return (
        <MantineProvider theme={{ colorScheme: 'dark' }} withGlobalStyles withNormalizeCSS>
        <div><Toaster/></div>

        <div style={{ padding: 12, width: "300px"}} >

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
        </MantineProvider>
    )
}