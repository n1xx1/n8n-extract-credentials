import {
	IExecuteFunctions,
	INodeCredentialDescription,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';

export class ExtractCredentials implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Extract Credentials',
		description: '',
		name: 'ExtractCredentials',
		group: ['output'],
		version: 1,
		defaults: {
			name: 'Extract Credentials',
		},
		inputs: ['main'],
		outputs: ['main'],
		get credentials() {
			const arr: INodeCredentialDescription[] = [];
			(arr.find as any) = () => true;
			return arr;
		},
		properties: [
			{
				displayName: 'Credential Type',
				name: 'nodeCredentialType',
				type: 'credentialsSelect',
				noDataExpression: true,
				required: true,
				default: '',
				credentialTypes: ['has:properties' as any],
			},
		],
	};
	async execute(this: IExecuteFunctions) {
		const credentialsType = this.getNodeParameter('nodeCredentialType', 0) as string;

		const credentials = await this.getCredentials(credentialsType, 0);
		if (!credentials) {
			throw new Error('credentials not found');
		}

		return [
			[
				{
					index: 0,
					pairedItem: 0,
					json: credentials,
				} as INodeExecutionData,
			],
		];
	}
}
