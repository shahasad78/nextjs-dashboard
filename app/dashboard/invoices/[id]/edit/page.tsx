import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";
import Form from "@/app/ui/invoices/edit-form";
import {fetchCustomers, fetchInvoiceById} from "@/app/lib/data";
import {Invoice} from "@/app/lib/definitions";
import {notFound} from "next/navigation";

async function Page(props: { params: Promise<{ id: string }>}) {
    const params = await props.params;
    const id = params.id;
    const [invoice, customers] = await Promise.all([
        fetchInvoiceById(id),
        fetchCustomers()
    ])

    if (!invoice) {
        console.log("Invoice not found");
        notFound();
    }

    return (
        <main>
            <Breadcrumbs breadcrumbs={[
                {label: 'Invoices', href: '/dashboard/invoices'},
                {
                    label: 'Edit Invoice',
                    href: `/dashboard/invoices/${id}/edit`,
                    active: true
                }
            ]}/>
            <Form invoice={invoice} customers={customers}/>
        </main>
    );
}

export default Page;
