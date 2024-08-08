import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { PageUrl } from '@/data/pages.constants'
import useSignUp from '@/hooks/useSignUp'
import { Loader2 } from 'lucide-react'
import { observer } from 'mobx-react'
import { Link } from 'react-router-dom'

const Register = observer(() => {
    const {
        firstName,
        setFirstName,
        lastName,
        setLastName,
        email,
        setEmail,
        password,
        setPassword,
        confirmPassword,
        setConfirmPassword,
        emailError,
        emailErrorMsg,
        passwordError,
        passwordErrorMsg,
        handleSubmit,
        isLoading,
    } = useSignUp()

    return (
        <div className="p-8">
            <Card className="mx-auto max-w-sm text-left p-1">
                <CardHeader>
                    <CardTitle className="text-xl">Sign Up</CardTitle>
                    <CardDescription>
                        Enter your information to create an account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="first-name">First name</Label>
                                <Input
                                    id="first-name"
                                    placeholder="John"
                                    value={firstName}
                                    onChange={(e) => {
                                        setFirstName(e.target.value)
                                    }}
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="last-name">Last name</Label>
                                <Input
                                    id="last-name"
                                    placeholder="Doe"
                                    value={lastName}
                                    onChange={(e) => {
                                        setLastName(e.target.value)
                                    }}
                                    required
                                />
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="j@example.com"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value)
                                }}
                                required
                            />
                            {emailError && (
                                <small className="text-sm text-red-300">
                                    {emailErrorMsg}
                                </small>
                            )}
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value)
                                }}
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password">Confirm Password</Label>
                            <Input
                                id="confirm-password"
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => {
                                    setConfirmPassword(e.target.value)
                                }}
                                required
                            />
                            {passwordError && (
                                <small className="text-sm text-red-300">
                                    {passwordErrorMsg}
                                </small>
                            )}
                        </div>
                        <Button
                            onClick={handleSubmit}
                            type="submit"
                            className="w-full"
                        >
                            {isLoading && (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            )}
                            Create an account
                        </Button>
                        {/* <Button variant="outline" className="w-full">
                            Sign up with GitHub
                        </Button> */}
                    </div>
                    <div className="mt-4 text-center text-sm">
                        Already have an account?{' '}
                        <Link to={PageUrl.LOGIN} className="underline">
                            Sign in
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
})

export default Register
