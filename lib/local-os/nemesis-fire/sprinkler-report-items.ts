export type ReportGroup = 'five-year' | 'annual' | 'maintenance'
export type ReportResult = 'pass' | 'fail' | 'na' | 'yes' | 'no' | ''
export type ReportInputMode = 'result' | 'yes-no' | 'pressure-below' | 'pressure-above' | 'seconds'


export interface SprinklerReportItem {
  id: string
  group: ReportGroup
  kind: 'I' | 'T' | 'M'
  description: string
  reference: string
  inputMode?: ReportInputMode
  instruction?: string
  comments?: boolean
}

export const SPRINKLER_REPORT_ITEMS: SprinklerReportItem[] = [
  { id: '1.1', group: 'five-year', kind: 'I', description: 'Control Valves – Identification Sign', reference: '13.3.1' },
  { id: '1.2', group: 'five-year', kind: 'I', description: 'Control Valves – Inspection', reference: '13.3.2' },
  { id: '1.3', group: 'five-year', kind: 'I', description: 'Waterflow Alarm Devices', reference: '5.2.5' },
  { id: '1.4', group: 'five-year', kind: 'I', description: 'Supervisory Devices', reference: '5.2.5' },
  { id: '1.5', group: 'five-year', kind: 'I', description: 'Gauges (Wet Pipe Systems)', reference: '5.2.4.1' },
  { id: '1.6', group: 'five-year', kind: 'I', description: 'Hydraulic Design Information Sign', reference: '5.2.6' },
  { id: '1.7', group: 'five-year', kind: 'I', description: 'Enter Water Supply Pressure Below Riser Check', reference: '5.2.4.1', inputMode: 'pressure-below', instruction: 'Enter the measured pressure in PSI for item 1.7. Do not enter this in comments.', comments: false },
  { id: '1.8', group: 'five-year', kind: 'I', description: 'Enter Water Supply Pressure Above Riser Check', reference: '5.2.4.1', inputMode: 'pressure-above', instruction: 'Enter the measured pressure in PSI for item 1.8. Do not enter this in comments.', comments: false },
  { id: '1.9', group: 'five-year', kind: 'I', description: 'Pressure Readings Acceptable', reference: '5.2.4.1' },
  { id: '1.10', group: 'five-year', kind: 'I', description: 'General Information Sign', reference: '5.2.8' },
  { id: '1.11', group: 'five-year', kind: 'I', description: 'Heat Tape', reference: '5.2.7' },
  { id: '1.12', group: 'five-year', kind: 'I', description: 'Spare Sprinklers', reference: '5.2.1.4' },
  { id: '1.13', group: 'five-year', kind: 'I', description: 'Fire Department Connections', reference: '13.7' },
  { id: '1.14', group: 'five-year', kind: 'I', description: 'Alarm Valves – Exterior Inspection', reference: '13.4.1' },
  { id: '1.15', group: 'five-year', kind: 'I', description: 'Pressure Reducing Valves', reference: '13.5.1.1' },
  { id: '1.16', group: 'five-year', kind: 'I', description: 'Backflow Preventers', reference: '13.6.1' },
  { id: '1.17', group: 'annual', kind: 'I', description: 'Small Hose Connections – Hose Valve', reference: '13.5.5.1' },
  { id: '1.18', group: 'annual', kind: 'I', description: 'PRV – Fire Sprinkler Systems', reference: '13.5.1.1' },
  { id: '1.19', group: 'annual', kind: 'I', description: 'Buildings (Freeze Protection)', reference: '4.1.1.1', comments: false, instruction: 'The official form already prints “Owner’s Responsibility” in the comments column.' },
  { id: '1.20', group: 'annual', kind: 'I', description: 'Sprinklers', reference: '5.2.1' },
  { id: '1.21', group: 'annual', kind: 'I', description: 'Sprinklers – Accessible Concealed Space', reference: '5.2.1.1.6' },
  { id: '1.22', group: 'annual', kind: 'I', description: 'Pipe and Fittings', reference: '5.2.2' },
  { id: '1.23', group: 'annual', kind: 'I', description: 'Pipe and Fittings – Accessible Concealed Space', reference: '5.2.2.3' },
  { id: '1.24', group: 'annual', kind: 'I', description: 'Hangers', reference: '5.2.3' },
  { id: '1.25', group: 'annual', kind: 'I', description: 'Hangers – Accessible Concealed Space', reference: '5.2.3.3' },
  { id: '1.26', group: 'annual', kind: 'I', description: 'Seismic Braces', reference: '5.2.3' },
  { id: '1.27', group: 'annual', kind: 'I', description: 'Seismic Braces – Accessible Concealed Space', reference: '5.2.3.3' },
  { id: '1.28', group: 'annual', kind: 'I', description: 'Unsprinklered Areas', reference: 'CFC 901.4', inputMode: 'yes-no', comments: false, instruction: 'Select Yes or No to match the checkboxes on the official form.' },
  { id: '2.1', group: 'annual', kind: 'T', description: 'Field Service Test – Send Report to Fire Code Official', reference: '5.3.1', comments: false, instruction: 'If required, enter F until the results are returned from the lab. Record only the result; there is no comments field for this item.' },
  { id: '2.2', group: 'annual', kind: 'T', description: 'Recalled Sprinklers', reference: 'Title 19 904.1(c)', instruction: 'If recalled sprinklers are not present, select Pass. If present, select Fail.' },
  { id: '2.3', group: 'annual', kind: 'T', description: 'Water Flow Alarm Devices', reference: '5.3.3 / 13.2.6', inputMode: 'seconds', comments: false, instruction: 'Enter the measured alarm time in seconds (90 seconds maximum). This value prints beside “sec.” on the form.' },
  { id: '2.4', group: 'annual', kind: 'T', description: 'Main Drain Test (enter readings on riser page)', reference: '13.2.5' },
  { id: '2.5', group: 'annual', kind: 'T', description: 'Control Valve – Position', reference: '13.3.3.2' },
  { id: '2.6', group: 'annual', kind: 'T', description: 'Control Valve – Operation', reference: '13.3.3.1' },
  { id: '2.7', group: 'annual', kind: 'T', description: 'Supervisory Devices', reference: '13.3.3.5' },
  { id: '2.8', group: 'annual', kind: 'T', description: 'Backflow Preventer Assemblies', reference: '13.6.2' },
  { id: '2.9', group: 'annual', kind: 'T', description: 'Small Hose Connections with PRV Hose Valves – Partial Flow Test', reference: '13.5.2.3 / 13.5.3.3' },
  { id: '2.10', group: 'annual', kind: 'T', description: 'PRV – Fire Sprinkler Systems', reference: '13.5.1.3' },
  { id: '2.11', group: 'annual', kind: 'T', description: 'Pressure Gauges – Calibration', reference: '5.3.2' },
  { id: '2.12', group: 'annual', kind: 'T', description: 'Small Hose Connections', reference: '13.5.6.2.2' },
  { id: '3.1', group: 'maintenance', kind: 'M', description: 'Check Valves – Internal Inspection', reference: '13.4.2' },
  { id: '3.2', group: 'maintenance', kind: 'M', description: 'Control Valves', reference: '13.3.4' },
  { id: '3.3', group: 'maintenance', kind: 'M', description: 'Fire Department Connection – Backflush', reference: '14.3.2.3 / 14.3.2.4' },
  { id: '3.4', group: 'maintenance', kind: 'M', description: 'Internal Pipe Inspection', reference: '14.2', inputMode: 'yes-no', comments: false, instruction: 'Select Yes or No using the checkboxes on the official form. Put findings in Deficiencies and Comments.' },
  { id: '3.5', group: 'maintenance', kind: 'M', description: 'Obstruction Investigation Required', reference: '14.3' },
  { id: '3.6', group: 'maintenance', kind: 'M', description: 'System Returned to Service', reference: '4.5.3', inputMode: 'yes-no', comments: false, instruction: 'Select Yes or No using the checkboxes on the official form.' },
]
