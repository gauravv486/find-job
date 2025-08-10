'use client'

const DeleteCompanyButton = ({ companyId }: {
    companyId: {
        id: string
    }
}) => {
    const id = companyId;
    async function handleDelete() {
        try {
            const res = await fetch(`/api/deletecompany/${companyId}`, {
                method: "DELETE",
            });
            const result = await res.json();
            if (result.success) {
                alert("Company Deleted Successfully")
            }
            else {
                alert("Problem in api route")
            }
        } catch (err: any) {
            alert(err.message)
        }
    }

    return (
        <button onClick={handleDelete}>Delete</button>
    )
}

export default DeleteCompanyButton
