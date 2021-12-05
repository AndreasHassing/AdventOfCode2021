$measurements = Get-Content $PSScriptRoot\..\measurements.txt -Delimiter "`n" | ForEach-Object { [int]$_ }

$lastMeasurement = $null
$deepeningMeasurements = 0

foreach ($measurement in $measurements) {
    if ($lastMeasurement -and $measurement -gt $lastMeasurement) {
        $deepeningMeasurements++
    }

    $lastMeasurement = $measurement
}

return $deepeningMeasurements
