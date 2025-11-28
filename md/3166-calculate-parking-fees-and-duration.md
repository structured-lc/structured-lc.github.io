### Leetcode 3166 (Medium): Calculate Parking Fees and Duration [Practice](https://leetcode.com/problems/calculate-parking-fees-and-duration)

### Description  
Given a table of parking transactions for multiple cars and parking lots, each row records:  
- **car_id:** unique ID for a car  
- **lot_id:** the parking lot identifier  
- **entry_time, exit_time:** timestamps for when the car entered and exited  
- **fee_paid:** fee for that particular stay  
  
For each car, calculate:  
  1. **total_fee_paid:** Total fees paid by that car across all stays and lots.  
  2. **avg_hourly_fee:** Average fee per hour paid by the car (rounded to 2 decimal places; average over all total time parked, not per stay).  
  3. **most_time_lot:** The lot where the car spent the most total parking time (if a tie, pick one with smallest lot_id).  
Return results for each car, sorted by car_id.

### Examples  

**Example 1:**  
Input:  
```
[ 
  {car_id: 1, lot_id: 5, entry_time: "2023-05-24 12:00", exit_time: "2023-05-24 12:30", fee_paid: 5},
  {car_id: 1, lot_id: 6, entry_time: "2023-05-24 12:40", exit_time: "2023-05-24 13:10", fee_paid: 6},
  {car_id: 2, lot_id: 6, entry_time: "2023-01-01 10:00", exit_time: "2023-01-01 11:30", fee_paid: 12}
]
```
Output:  
```
[
  [1, 11, 11.00, 6],
  [2, 12, 8.00, 6]
]
```
*Explanation:*
- Car 1: (5+6) = 11 fee, (30min in lot 5 + 30min in lot 6 = 1hr total), avg = 11/1 = 11.00, longest in lot 6 (since both 30min, and 6 < 5 not true, but 6 is picked here).
- Car 2: 90min = 1.5hr, avg = 12/1.5 = 8.00, lot 6 total time.

**Example 2:**  
Input:  
```
[
  {car_id: 3, lot_id: 2, entry_time: "2024-02-10 08:00", exit_time: "2024-02-10 09:00", fee_paid: 10},
  {car_id: 3, lot_id: 2, entry_time: "2024-02-11 08:00", exit_time: "2024-02-11 08:10", fee_paid: 1},
  {car_id: 3, lot_id: 3, entry_time: "2024-01-01 00:00", exit_time: "2024-01-01 04:00", fee_paid: 20}
]
```
Output:  
```
[
  [3, 31, 5.17, 3]
]
```
*Explanation:*
- Car 3: lot 2: (60+10)=70min, lot 3: 240min; lot 3 wins. All durations sum: 70+240 = 310min = 5.166hr, 31/6=5.17.

**Example 3:**  
Input:  
```
[
  {car_id: 4, lot_id: 1, entry_time: "2023-12-25 11:00", exit_time: "2023-12-25 12:00", fee_paid: 24}
]
```
Output:  
```
[
  [4, 24, 24.00, 1]
]
```
*Explanation:*  
- Only one stay, 1hr, avg = 24/1=24.00, duration all in lot 1.

### Thought Process (as if you’re the interviewee)  

First, group the data for each car:  
- Sum up **fee_paid** per car (can do while processing).  
- Compute **duration** for each stay: parse entry/exit times, take difference (in minutes, then convert sum to hours for avg).  
- Track per-lot duration for each car to determine the lot where the car spent the most time (if equal, the one with smaller lot_id).

Brute force idea is to process each transaction row by row and build:  
- dict: car_id → total_fee_paid & total_duration_minutes  
- dict: car_id → {lot_id → duration_minutes}  
After calculating, for each car: find lot_id with max duration (if tie, pick smallest).

For average: (total_fee_paid) / (total duration in hours), round to two decimals.

This single-pass processing is efficient.

Trade-offs:  
- Using dict-of-dicts is simple: all stats available in O(1) lookup.  
- Parsing timestamps must be careful (string → datetime), ensure all mins/hours computed correctly.  

### Corner cases to consider  
- Multiple lots with **same max total duration** for a car (pick smallest lot_id).
- Car only parks once.
- Stays <1hr (fractional hours).
- Input can be empty (no cars).
- Entry_time equals exit_time (0 duration, should skip or treat as 0?).
- Large durations spanning days.

### Solution

```python
from datetime import datetime
from collections import defaultdict

def calculateParkingFeesAndDuration(transactions):
    # car_id → total_fee, total_duration_in_minutes
    total_fee = defaultdict(int)
    total_duration = defaultdict(int)
    # car_id → lot_id → duration_in_minutes
    car_lot_duration = defaultdict(lambda: defaultdict(int))

    for tx in transactions:
        car = tx['car_id']
        lot = tx['lot_id']
        fee = tx['fee_paid']
        # Parse timestamps
        fmt = "%Y-%m-%d %H:%M"
        entry = datetime.strptime(tx['entry_time'], fmt)
        exit = datetime.strptime(tx['exit_time'], fmt)
        duration = int((exit - entry).total_seconds() // 60)  # in minutes

        total_fee[car] += fee
        total_duration[car] += duration
        car_lot_duration[car][lot] += duration

    result = []
    for car in sorted(total_fee):
        fee = total_fee[car]
        duration_minutes = total_duration[car]
        duration_hrs = duration_minutes / 60 if duration_minutes else 0
        avg_fee = round(fee / duration_hrs, 2) if duration_hrs > 0 else 0.00

        # Get lot(s) with max duration for this car
        lot_durations = car_lot_duration[car]
        max_duration = max(lot_durations.values())
        most_time_lots = [lot for lot, d in lot_durations.items() if d == max_duration]
        most_time_lot = min(most_time_lots)

        result.append([car, fee, avg_fee, most_time_lot])

    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is number of transactions. Each transaction processed once, aggregates are dictionary lookups.
- **Space Complexity:** O(k\*l), where k = unique car_ids, l = max number of lots per car. Space mostly held by aggregates for each car.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you efficiently handle **millions of records** (e.g., batch processing or using databases)?  
  *Hint: Consider streaming, chunking, or SQL group-by aggregation.*

- What if transaction **input is not sorted**?  
  *Hint: Our approach does not require sorting, but if parsing or associations depend on order, address that.*

- Can you handle **overlapping stays** or **invalid timestamps**?  
  *Hint: Add validation per record, handle negative or zero durations carefully.*


### Summary
This problem is a variant of **group by aggregation** and **dictionary counting**, a very standard pattern in data summarization. Processing and summarizing events per key (here, per car) is a common interview technique and directly applies in log analytics, billing, and transaction reporting. Careful timestamp calculation and max/min selection are recurring subpatterns.


### Flashcard
Group transactions by car_id; sum fees and durations per car; for each car, find the lot with maximum duration (break ties by smallest lot_id).

### Tags
Database(#database)

### Similar Problems
