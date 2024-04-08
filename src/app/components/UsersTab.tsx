import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { TabsContent } from "@radix-ui/react-tabs";
import { RoleTabProps } from "../types";

export default function UsersTab({
  tabName,
  description,
  children,
}: RoleTabProps) {
  return (
    <TabsContent value={tabName} className="w-full">
      <Card>
        <CardHeader>
          <CardTitle>
            {tabName[0].toUpperCase() + tabName.substring(1) + 's'}
          </CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
        <CardContent className="space-y-2">{children}</CardContent>
      </Card>
    </TabsContent>
  );
}
