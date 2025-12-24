import Username from '@/components/Username';

import DragDrop from '@/components/DragDrop';

interface OnboardingProps {
    name: string;
    changeName: (name: string) => void;
}

function Onboarding({ name, changeName }: OnboardingProps) {
    return (
        <>
            <Username name={name} changeName={changeName} />
            <DragDrop />
        </>
    );
}

export default Onboarding;
