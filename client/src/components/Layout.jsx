import Header from './Header';

export default function Layout({
    page,
    user,
    setUser,
    children,
    bottomActions,
}) {
    const handleNameChange = (newName) => {
        setUser({ ...user, name: newName });
    };

    return (
        <div className="max-w-100 mx-auto">
            <div className="min-h-screen flex flex-col items-center gap-4 pt-[30vh] pb-35">
                <Header
                    page={page}
                    name={user.name}
                    setName={handleNameChange}
                />
                {children}
            </div>

            {bottomActions && (
                <div className="fixed bottom-0 max-w-100 w-full">
                    <div className="w-full flex flex-col gap-2 pb-10 pt-6 bg-linear-to-b from-transparent to-white">
                        {bottomActions}
                    </div>
                </div>
            )}
        </div>
    );
}
