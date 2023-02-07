import { CopyButton, Tooltip, ActionIcon } from "@mantine/core";
import { IconCheck, IconCopy } from "@tabler/icons";

type CopyTextIconProps = {
    hashedPassword: string;
}
    
function CopyTextIcon({ hashedPassword }: CopyTextIconProps){
    return (
        <CopyButton value={hashedPassword} timeout={2000}>
            {({ copied, copy }) => (
                <Tooltip label={copied ? 'Copied' : 'Copy'} withArrow position="right">
                <ActionIcon color={copied ? 'teal' : 'gray'} onClick={copy} mt={24}>
                    {copied ? <IconCheck size={16} /> : <IconCopy size={16} />}
                </ActionIcon>
                </Tooltip>
            )}
        </CopyButton>
    )
}
    
export default CopyTextIcon
