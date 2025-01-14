import { useEffect, useState } from "react"
import { useForm } from '@mantine/form';
import { MantineProvider, Button, PasswordInput, Grid, Select, Badge, Group, TextInput } from '@mantine/core';

import toast, { Toaster } from "react-hot-toast";

import { sha256 } from "~utilis/sha256";
import { getTabsInfo } from "~utilis/utilis";
import CopyTextIcon from "./CopyTextIcon";
import { IconLockSquare } from "@tabler/icons";

export function Main() {

    try {
        const [hashedPassword, setHashedPassword] = useState<string>("");
        const [showPwLength, setShowPwLength] = useState<string>("16");

        function getCurrentTabInfo() {
            chrome.tabs.query(
                {
                    active: true,
                    currentWindow: true,
                },
                function (tabs) {
                    const tabInfo = getTabsInfo(tabs);
                    form.setFieldValue("domain", tabInfo.domain)
                },
            )
        }

        useEffect( () => {
            document.body.style.borderRadius = "10px";
            document.getElementById("__plasmo").style.borderRadius = "10px";
        },[])

        useEffect(() => {

            getCurrentTabInfo();

            chrome.tabs.onActivated.addListener(() => {
                getCurrentTabInfo();
            })

            chrome.tabs.onUpdated.addListener(() => {
                getCurrentTabInfo();
            })

        }, [chrome]);

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

        function hashPw(values: { domain: string, password: string }) {
            const finalStr = values.domain.trim() + values.password
            setHashedPassword(sha256(finalStr));
            toast.success('Success to hash')
        }

        return (
            <MantineProvider theme={{ colorScheme: 'dark' }} withGlobalStyles withNormalizeCSS>
                <>
                    <Toaster />

                    <div style={{ padding: 12, width: "350px" }} >

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
                            <TextInput
                                label="Domain"
                                description="Enter your website domain here"
                                withAsterisk
                                {...form.getInputProps('domain')}
                            />

                            <PasswordInput
                                label="Password"
                                withAsterisk
                                placeholder="Password"
                                description="Your password to be generate the hash value"
                                mt={6}
                                {...form.getInputProps('password')}
                            />

                            <Button
                                leftIcon={<IconLockSquare size={16} />}
                                disabled={form.values.domain === "" || form.values.password === ""}
                                mt={20}
                                variant="gradient"
                                gradient={{ from: 'indigo', to: 'cyan', deg: 60 }}
                                fullWidth
                                type="submit"
                            >
                                Encode
                            </Button>

                        </form>

                        {hashedPassword !== "" && (
                            <>
                                <Select
                                    mt={6}
                                    label="Length"
                                    description="Password length"
                                    data={[
                                        ...[8, 16, 24, 32, 40, 48, 56].map(v => ({ value: v + "", label: v + "" })),
                                        { value: 'Full', label: 'Full' }
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
                </>
            </MantineProvider>
        )
    }
    catch (err: any) {
        return (
            <h3>{err.message}</h3>
        )
    }

}
