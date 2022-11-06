import { DeliveryStates, OrderStates } from "../../definitions";

interface DeliveryProps {
    eta?: string;
    quantity?: number;
    accepted_quantity?: number;
    status?: DeliveryStates;
    index?: number;
    siteManager?: boolean;
    onChangeState?: (status: DeliveryStates, id: string) => void;
    id?:string;
}

export default function Delivery({ eta, quantity, accepted_quantity, status, index, siteManager, onChangeState, id }: DeliveryProps) {
    return (
        <div className="p-4 justify-center border-2 border-[#0097d4] rounded-lg flex flex-row">
            <div className="flex-grow">
                <div className="font-bold">Delivery #{String(index ?? 0).padStart(4, '0')}</div>
                <div>Date : {eta}</div>
                <div>Sent Quantity : {accepted_quantity}</div>
                <div>Accepted Quantity : {quantity}</div>
                <div>Status : {status}</div>
            </div>
            <div className="flex-grow"></div>
            {
                siteManager && (
                    <div className="flex flex-col gap-2">
                        <button
                            onClick={() => { (onChangeState && id) && onChangeState(DeliveryStates.ACCEPTED, id) }}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-7 mr-2 rounded-2xl"
                        >
                            Accept
                        </button>
                        <button
                            onClick={() => { (onChangeState && id) && onChangeState(DeliveryStates.RETURNED, id) }}
                            className="text-blue-500 border-2 border-[#0097d4] hover:bg-blue-700 hover:text-white bg-white font-bold py-2 px-7 mr-2 rounded-2xl">
                            Return
                        </button>
                    </div>
                )
            }
        </div>
    )
}