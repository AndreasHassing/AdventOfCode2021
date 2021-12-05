$measurements = Get-Content $PSScriptRoot\..\measurements.txt -Delimiter "`n" | ForEach-Object { [int]$_ }

function ShiftLeft($Array, $Element) {
    $array[0] = $array[1]
    $array[1] = $array[2]
    $array[2] = $element
}

function Sum($Array) {
    $sum = 0
    $Array | ForEach-Object { $sum += $_ }

    $sum
}

$slidingWindow = @($null, $null, $null)
$currentSlidingMeasurement = $null
$deepeningMeasurements = 0

foreach ($measurement in $measurements) {
    ShiftLeft -Array $slidingWindow -Element $measurement

    if ($slidingWindow -contains $null) {
        continue
    }

    $newSlidingMeasurement = Sum -Array $slidingWindow

    if ($currentSlidingMeasurement -and $newSlidingMeasurement -gt $currentSlidingMeasurement) {
        $deepeningMeasurements++
    }

    $currentSlidingMeasurement = $newSlidingMeasurement
}

return $deepeningMeasurements
