import { Card } from '@/components/ui/card'

const TypesSingapore = () => {
    const types = ['Cultural', 'Nature', 'Adventure', 'Food']

    return (
        <Card className="p-6">
            <h3 className="mb-4 text-lg font-medium">Types Singapore</h3>
            <div className="space-y-4">
                {types.map((type) => (
                    <div
                        key={type}
                        className="flex items-center justify-between rounded-lg border border-gray-200 p-3"
                    >
                        <span className="text-sm font-medium text-gray-900">
                            {type}
                        </span>
                        <div className="h-2 w-24 rounded-full bg-gray-200">
                            <div
                                className="h-2 rounded-full bg-teal-600"
                                style={{ width: `${Math.random() * 100}%` }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </Card>
    )
}

export default TypesSingapore
