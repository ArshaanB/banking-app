'use client';

import { useMutation } from '@tanstack/react-query';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { Plus, CheckCircle, XCircle } from 'lucide-react';
import { ReactNode, useState } from 'react';
import { Entity } from '@/lib/api';

type ArgsObject = { [key: string]: string | number };

export default function CreateNewEntity<T extends ArgsObject>({
  mutationFn,
  entityTitle,
  children,
  initialState
}: {
  mutationFn: (args: T) => Promise<Entity>;
  entityTitle: string;
  children: (
    args: T,
    setArgs: React.Dispatch<React.SetStateAction<T>>,
    isPending: boolean
  ) => ReactNode;
  initialState: T;
}) {
  const [argsForEntity, setArgsForEntity] = useState<T>(initialState);
  const [createdEntity, setCreatedEntity] = useState<Entity | null>(null);

  const { mutate, isPending, isSuccess, isError } = useMutation({
    mutationFn: mutationFn,
    onSuccess: (data) => {
      setCreatedEntity(data);
      setArgsForEntity(initialState);
    }
  });

  const handleCreateEntity = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(argsForEntity);
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Plus className="h-5 w-5 text-green-600" />
            <CardTitle>Create New {entityTitle}</CardTitle>
          </div>
          <CardDescription>
            Add a new {entityTitle.toLowerCase()} to your database
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleCreateEntity} className="space-y-4">
            {children(argsForEntity, setArgsForEntity, isPending)}
          </form>
        </CardContent>
      </Card>

      {/* Success/Error Banner */}
      {(isSuccess || isError) && (
        <Alert
          className={
            isSuccess
              ? 'border-green-200 bg-green-50'
              : 'border-red-200 bg-red-50'
          }
        >
          {isSuccess ? (
            <CheckCircle className="h-4 w-4 text-green-600" />
          ) : (
            <XCircle className="h-4 w-4 text-red-600" />
          )}
          <AlertDescription
            className={isSuccess ? 'text-green-800' : 'text-red-800'}
          >
            {isSuccess
              ? `${entityTitle} created successfully with ID: ${createdEntity?.id}`
              : `Failed to create ${entityTitle.toLowerCase()}`}
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
