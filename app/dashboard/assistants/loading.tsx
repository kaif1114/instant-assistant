import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

function Loading() {
    // Create an array of 5 skeleton rows
    const skeletonRows = Array(4).fill(null);

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {skeletonRows.map((_, index) => (
                    <TableRow key={index}>
                        <TableCell>
                            <div className="flex items-center gap-4">
                                <Skeleton className="h-4 w-32" />
                            </div>
                        </TableCell>
                        <TableCell>
                            <Skeleton className="h-4 w-20" />
                        </TableCell>
                        <TableCell>
                            <Skeleton className="h-5 w-16 rounded-full" />
                        </TableCell>
                        <TableCell className="text-right">
                            <div className="flex justify-end">
                                <Skeleton className="h-8 w-8 rounded" />
                            </div>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}

export default Loading;
