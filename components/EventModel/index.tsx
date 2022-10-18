import { FormEventHandler, useState } from 'react'
import { IEvent } from '~/db';

type Props = {
    setShowModel: (value: boolean) => void;
    event: IEvent;
}

const EventModel = (props: Props) => {

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState<boolean | null>(null);

    const submitHandler: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const tickets = parseInt(Object.fromEntries(formData.entries()).tickets as string);
        setLoading(true);
        console.log(tickets);
        setLoading(false);
    }

    return (
        <div onClick={() => props.setShowModel(false)} className='fixed h-screen w-screen bg-[#000000a2] grid place-items-center z-50'>
            <div onClick={(e) => { e.stopPropagation() }} className=' bg-white'>
                <img src={props.event.imageURL} alt={props.event.event} width="500" />
                <div className='flex justify-between items-center p-5'>
                    <h2 className='font-sora text-2xl font-semibold'>{props.event.event}</h2>
                    <div className='flex gap-5'>
                        <h2 className='font-sora text-2xl font-semibold'>{props.event.date}</h2>
                        <h2 className='font-sora text-2xl font-semibold'>{props.event.ticketSupply}</h2>
                    </div>
                </div>

                <form className='flex flex-col gap-5 p-5' onSubmit={submitHandler}>
                    <input className='border-2 border-[#FF5F26] rounded-xl p-5' type="number" placeholder='Number of tickets' name='tickets' required min="1" max={props.event.ticketSupply} />
                    <div className='flex flex-wrap gap-4'>
                        <button type='submit' className='py-2 px-4 rounded-xl bg-orange-500 text-white'>Mint Tickets</button>
                        <button className='py-2 px-4 rounded-xl bg-orange-500 text-white' onClick={() => props.setShowModel(false)}>Close</button>
                    </div>
                </form>
                {loading && <div className="text-xl">Loading...</div>}
                {success === true && <div className="text-xl">Success!</div>}
                {success === false && <div className="text-xl">Error!</div>}
            </div>
        </div>
    )
}

export default EventModel
