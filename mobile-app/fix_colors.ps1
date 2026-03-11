Get-ChildItem -Recurse -Filter *.dart | ForEach-Object {
    $content = Get-Content $_.FullName
    $content = $content -replace 'primaryNavy', 'primaryBlue'
    Set-Content -Path $_.FullName -Value $content
}
