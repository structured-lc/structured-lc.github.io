### Leetcode 751 (Medium): IP to CIDR [Practice](https://leetcode.com/problems/ip-to-cidr)

### Description  
Given a **starting IPv4 address** and an integer **n**, return the *smallest possible list* of CIDR (Classless Inter-Domain Routing) blocks that **exactly covers the n IP addresses**, starting from the initial address.  
CIDR blocks are formatted as "a.b.c.d/x" where "a.b.c.d" is the IP address and "x" is the prefix length, which determines the block size (i.e., how many IPs are covered).  
The challenge is to generate as few blocks as possible by grouping sequential IPs into larger CIDR blocks, without covering more than necessary.

### Examples  

**Example 1:**  
Input: `ip = "255.0.0.7", n = 10`  
Output: `["255.0.0.7/32","255.0.0.8/29","255.0.0.16/32"]`  
Explanation:  
- "255.0.0.7/32" covers 1 IP (255.0.0.7)  
- "255.0.0.8/29" covers 8 IPs (255.0.0.8 to 255.0.0.15)  
- "255.0.0.16/32" covers 1 IP (255.0.0.16)  
Total: 1 + 8 + 1 = 10 IPs covered in minimal blocks.

**Example 2:**  
Input: `ip = "192.168.0.0", n = 4`  
Output: `["192.168.0.0/30"]`  
Explanation:  
"192.168.0.0/30" covers IPs 192.168.0.0 to 192.168.0.3 (4 IPs). Block aligns with start, requires just one CIDR block.

**Example 3:**  
Input: `ip = "10.0.0.1", n = 1`  
Output: `["10.0.0.1/32"]`  
Explanation:  
Only one IP to cover. Single IP block, /32.

### Thought Process (as if you’re the interviewee)  
- **Naive idea:** Generate each individual IP and output as /32 CIDR blocks. Not efficient for large n.
- **Optimization:** Group IPs into *as large* CIDR blocks as allowed by alignment and by the remaining number n.
    - Always use the largest power-of-two block possible at each step. But that *block size* must not run past the required n or misalign with the current start address (block must not overlap outside sequence).
    - Use bit manipulation:
        - Convert IP string to a 32-bit integer.
        - At each step, determine the largest block that both:
            - is *aligned* with the current integer (using num & -num yields the lowest 1 bit, i.e., largest block aligned at current position)
            - does not exceed the remaining n
        - Emit the CIDR string, update position and n, repeat until all n IPs are covered.
    - Trade-off: This greedy approach ensures minimal number of CIDR blocks and fast execution.

### Corner cases to consider  
- n = 1 (smallest case)
- n is a large number that crosses major octet boundaries
- Starting IP is at a value not divisible by 2 (unaligned)  
- Leading zeroes in IP segments or IPs already at the end of IPv4 space  
- n perfectly fits a single block (e.g., n = 256 and start at xxx.xxx.x.0)

### Solution

```python
def ip_to_cidr(ip, n):
    def ip_to_int(ip):
        parts = list(map(int, ip.split('.')))
        res = 0
        for part in parts:
            res = (res << 8) | part
        return res

    def int_to_ip(num):
        return '.'.join(str((num >> offset) & 255) for offset in (24, 16, 8, 0))

    res = []
    start = ip_to_int(ip)
    while n > 0:
        # largest block that current IP is aligned to
        lowbit = start & -start
        max_block = 1
        # Find the largest block we can use that doesn't exceed n
        while lowbit > n:
            lowbit //= 2
        max_block = lowbit
        prefix_len = 32
        while max_block > 1:
            max_block //= 2
            prefix_len -= 1
        res.append(f"{int_to_ip(start)}/{prefix_len}")
        cnt = 1 << (32 - prefix_len)
        start += cnt
        n -= cnt
    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(log n).  
  Each iteration at least halves the remaining n by taking the largest possible block, so the total iterations are at most ⌊log₂(n)⌋ + 1. All conversion functions work in constant time.

- **Space Complexity:** O(log n)  
  The output list contains at most O(log n) CIDR blocks. There is negligible extra space other than the result.

### Potential follow-up questions (as if you’re the interviewer)  

- What if IPv6 addresses instead of IPv4?  
  *Hint: Consider the longer address (128 bits), conversion logic, and string formatting changes.*

- How would you handle cases where n is extremely large (e.g., billions)?  
  *Hint: Output format, streaming output, or memory-efficient approaches matter.*

- Can the order of the output blocks be different?  
  *Hint: Does CIDR require sorted output by block size or starting address?*

### Summary
This problem uses **bit manipulation** and **greedy grouping** to convert an IP range into the minimal set of CIDR blocks (greedy interval covering).  
The key pattern is to always choose the largest possible aligned power-of-two block at each step.  
This is a common pattern in address partitioning, interval grouping, or networking-related segmentation problems.  
Other scenarios: memory segment partitioning, efficient resource allocation, block grouping algorithms.

### Tags
String(#string), Bit Manipulation(#bit-manipulation)

### Similar Problems
- Restore IP Addresses(restore-ip-addresses) (Medium)
- Validate IP Address(validate-ip-address) (Medium)