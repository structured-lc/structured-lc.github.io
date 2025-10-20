### Leetcode 2125 (Medium): Number of Laser Beams in a Bank [Practice](https://leetcode.com/problems/number-of-laser-beams-in-a-bank)

### Description  
Given a bank's floor plan as a list of binary strings (`bank`), each row represents a bank corridor with '1' for a security device and '0' for empty space.  
A *laser beam* can be formed between security devices in two **different rows** if **all rows between them have no devices**. For each valid pair of rows with devices, every device in the upper row connects to every device in the next device row below.  
Return the **total number of such laser beams** present in the bank.

### Examples  

**Example 1:**  
Input: `["011001","000000","010100","001000"]`  
Output: `8`  
*Explanation:  
- Row 0 has devices at indices 1,2,5 (count: 3).  
- Row 1 has none (ignored).
- Row 2 has devices at indices 1,3 (count: 2).  
- Between row 0 and row 2: 3 × 2 = 6 beams.  
- Row 3 has device at index 2 (count: 1).  
- Between row 2 and row 3: 2 × 1 = 2 beams.  
Total beams = 6 + 2 = 8.*

**Example 2:**  
Input: `["000","111","000"]`  
Output: `0`  
*Explanation: 
Devices only in the middle row, so no two device rows to form beams.*

**Example 3:**  
Input: `["1","1","1"]`  
Output: `2`  
*Explanation:  
- Devices on each row (all only one device per row).
- Row 0 and row 1: 1 × 1 = 1 beam.  
- Row 1 and row 2: 1 × 1 = 1 beam.  
Total beams = 2.*

### Thought Process (as if you’re the interviewee)  
First, identify all rows that contain at least one device. Laser beams only form **between pairs of non-empty device rows where all in-between rows are empty**; this means *consecutive* device rows (skipping all-empty rows).

Brute-force:  
- For every pair of rows, scan all intermediate rows for devices and count accordingly.
- This is unnecessarily slow for large banks.

Optimization:  
- Once we filter out empty rows, for each pair of consecutive device rows, multiply their device counts to get the number of beams formed between them.
- Sum over all consecutive device row pairs.

Chosen approach:  
- This optimized solution avoids unnecessary intermediate checks and only processes rows with devices, so it is both simple and efficient.

### Corner cases to consider  
- All rows are empty: result is 0.
- Only one row has devices: result is 0 (need at least two rows with devices).
- Devices only on non-adjacent rows (all intermediate rows empty - still count as consecutive device rows after filtering empties).
- Each row contains a single device (simplest multiple connection case).
- Maximum limit sizes (m or n = 500): should perform efficiently.

### Solution

```python
def numberOfBeams(bank):
    # List to store the count of devices in each non-empty row
    device_counts = []
    for row in bank:
        count = row.count('1')
        if count > 0:
            device_counts.append(count)
    
    total = 0
    # For each consecutive pair of device rows, multiply their device counts
    for i in range(1, len(device_counts)):
        total += device_counts[i-1] * device_counts[i]
    
    return total
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(m × n).
  - Each row is scanned once (counting '1's) ⟹ O(m × n).
  - Summing device counts over ≤ m rows: O(m).
  - Total dominated by row scanning: O(m × n).
- **Space Complexity:** O(m).
  - Storing up to m device counts (one per non-empty row).
  - No extra large structures or recursion.

### Potential follow-up questions (as if you’re the interviewer)  

- What if laser beams can travel diagonally?
  *Hint: Consider how you would need to check columns in diagonals, not just vertical pairs.*

- Can this be solved with a single pass and O(1) extra space?
  *Hint: Try keeping only previous non-zero device count and accumulating to total as you scan.*

- If each device can only form a single beam, how do you maximize the number of beams?
  *Hint: Greedy pairing or matching strategies may be required.*

### Summary
This problem uses the **adjacent grouping pattern**: group/skip empty rows, then process pairs of relevant rows with a fixed formula (multiply device counts).
It’s a classic "filter and pairwise accumulate" style—a variation seen in consecutive subarrays/subsequences, group-by problems, and graph edge counting among selected vertices.


### Flashcard
Count device-containing rows, then for each consecutive pair multiply their device counts and sum all products.

### Tags
Array(#array), Math(#math), String(#string), Matrix(#matrix)

### Similar Problems
- Set Matrix Zeroes(set-matrix-zeroes) (Medium)