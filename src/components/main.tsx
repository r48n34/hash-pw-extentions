import { useState } from "react"
import { Button, Textarea, PasswordInput, CopyButton, ActionIcon, Tooltip, Grid } from '@mantine/core';
import { IconCheck, IconCopy } from "@tabler/icons";
import CopyTextIcon from "./CopyTextIcon";

export function Main({ name = "Extension" }) {
  
    const [ domain, setDomain ] = useState<string>("");
    const [ password, setPassword ] = useState<string>("");

    const [ hashedPassword, setHashedPassword ] = useState<string>("");

    function hashPw(){
        setHashedPassword(password)
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
            <Textarea 
                label="Domain"
                minRows={1}
                value={domain}
                onChange={(event) => setDomain(event.currentTarget.value)}
            />

            <PasswordInput 
                label="Password" 
                placeholder="Password" 
                mt={6}
                value={password}
                onChange={(event) => setPassword(event.currentTarget.value)}
            />

            <Button mt={20} onClick={ () => hashPw() }>Encode</Button>

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
