import 'package:flutter/material.dart';
import '../../theme/app_theme.dart';
import '../../widgets/back_button.dart';

class BusTrackingScreen extends StatelessWidget {
  final String busId;

  const BusTrackingScreen({super.key, required this.busId});

  @override
  Widget build(BuildContext context) {
    final stops = [
      {
        'name': 'Ghadhi Chowk',
        'distance': '0 km',
        'scheduledTime': '8:30',
        'actualTime': '8:45',
        'status': 'delayed',
        'delay': '15min',
      },
      {
        'name': 'Gandhi Udyan',
        'distance': '3 km',
        'scheduledTime': '8:30',
        'actualTime': '8:30',
        'status': 'ontime',
        'delay': null,
      },
      {
        'name': 'Gandhi Udyan',
        'distance': '3 km',
        'scheduledTime': '8:30',
        'actualTime': '8:30',
        'status': 'delayed',
        'delay': '3min',
      },
      {
        'name': 'Ghadhi Chowk',
        'distance': '0 km',
        'scheduledTime': '8:30',
        'actualTime': '8:45',
        'status': 'delayed',
        'delay': '15min',
      },
      {
        'name': 'Gandhi Udyan',
        'distance': '3 km',
        'scheduledTime': '8:30',
        'actualTime': '8:30',
        'status': 'delayed',
        'delay': '3min',
      },
    ];

    return Scaffold(
      backgroundColor: AppTheme.backgroundLight,
      body: SafeArea(
        child: Column(
          children: [
            // Header
            Padding(
              padding: const EdgeInsets.all(16),
              child: Row(
                children: [
                  BackButtonWidget(onPressed: () => Navigator.pop(context)),
                  const SizedBox(width: 16),
                  Container(
                    padding: const EdgeInsets.symmetric(
                      horizontal: 20,
                      vertical: 10,
                    ),
                    decoration: BoxDecoration(
                      color: AppTheme.primaryBlue,
                      borderRadius: BorderRadius.circular(25),
                    ),
                    child: Text(
                      busId,
                      style: const TextStyle(
                        color: Colors.white,
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                  ),
                ],
              ),
            ),
            // Status row
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Row(
                    children: [
                      const Icon(
                        Icons.directions_bus,
                        color: AppTheme.primaryBlue,
                      ),
                      const SizedBox(width: 8),
                      const Text(
                        'On Its Way',
                        style: TextStyle(
                          fontWeight: FontWeight.w600,
                          color: AppTheme.textDark,
                        ),
                      ),
                    ],
                  ),
                  TextButton.icon(
                    onPressed: () {
                      // TODO: Open map view
                    },
                    icon: const Icon(
                      Icons.map_outlined,
                      color: AppTheme.primaryBlue,
                    ),
                    label: const Text(
                      'View in map',
                      style: TextStyle(color: AppTheme.primaryBlue),
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 8),
            // Column headers
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16),
              child: Row(
                children: [
                  const Icon(
                    Icons.route,
                    color: AppTheme.primaryBlue,
                    size: 20,
                  ),
                  const SizedBox(width: 8),
                  const Text(
                    'Bus Stop',
                    style: TextStyle(
                      fontWeight: FontWeight.w600,
                      color: AppTheme.textDark,
                    ),
                  ),
                  const Spacer(),
                  const Text(
                    'Arrival',
                    style: TextStyle(
                      fontWeight: FontWeight.w600,
                      color: AppTheme.primaryBlue,
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 16),
            // Stops list
            Expanded(
              child: ListView.builder(
                padding: const EdgeInsets.symmetric(horizontal: 16),
                itemCount: stops.length,
                itemBuilder: (context, index) {
                  final stop = stops[index];
                  final isCurrentStop = index == 1;

                  return _buildStopItem(
                    name: stop['name'] as String,
                    distance: stop['distance'] as String,
                    scheduledTime: stop['scheduledTime'] as String,
                    actualTime: stop['actualTime'] as String,
                    status: stop['status'] as String,
                    delay: stop['delay'] as String?,
                    isCurrentStop: isCurrentStop,
                    isFirst: index == 0,
                    isLast: index == stops.length - 1,
                  );
                },
              ),
            ),
            // Bottom nearest stop info
            Container(
              padding: const EdgeInsets.all(16),
              decoration: const BoxDecoration(
                color: AppTheme.primaryBlue,
                borderRadius: BorderRadius.vertical(top: Radius.circular(20)),
              ),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Row(
                        children: [
                          const Icon(
                            Icons.location_on_outlined,
                            color: Colors.white70,
                            size: 18,
                          ),
                          const SizedBox(width: 4),
                          const Text(
                            'Nearest boarding point',
                            style: TextStyle(
                              color: Colors.white70,
                              fontSize: 12,
                            ),
                          ),
                        ],
                      ),
                      const SizedBox(height: 4),
                      const Text(
                        'Telibandha Chowk',
                        style: TextStyle(
                          color: Colors.white,
                          fontSize: 18,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                      const Text(
                        'Reach by 13:15',
                        style: TextStyle(color: Colors.white70, fontSize: 12),
                      ),
                    ],
                  ),
                  Container(
                    padding: const EdgeInsets.symmetric(
                      horizontal: 16,
                      vertical: 8,
                    ),
                    decoration: BoxDecoration(
                      color: Colors.white.withOpacity(0.2),
                      borderRadius: BorderRadius.circular(25),
                    ),
                    child: Row(
                      children: [
                        const Text(
                          '250m',
                          style: TextStyle(color: Colors.white),
                        ),
                        const SizedBox(width: 8),
                        Container(
                          width: 35,
                          height: 35,
                          decoration: const BoxDecoration(
                            color: Colors.white,
                            shape: BoxShape.circle,
                          ),
                          child: const Icon(
                            Icons.navigation,
                            color: AppTheme.primaryBlue,
                            size: 20,
                          ),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildStopItem({
    required String name,
    required String distance,
    required String scheduledTime,
    required String actualTime,
    required String status,
    String? delay,
    required bool isCurrentStop,
    required bool isFirst,
    required bool isLast,
  }) {
    final isDelayed = status == 'delayed';
    final statusColor = isDelayed ? AppTheme.errorRed : AppTheme.successGreen;

    return Row(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        // Timeline indicator
        Column(
          children: [
            Container(
              width: 12,
              height: 12,
              decoration: BoxDecoration(
                color: isCurrentStop
                    ? AppTheme.primaryBlue
                    : Colors.grey.shade300,
                shape: BoxShape.circle,
              ),
            ),
            if (!isLast)
              Container(width: 2, height: 60, color: Colors.grey.shade300),
          ],
        ),
        const SizedBox(width: 12),
        // Stop info
        Expanded(
          child: Container(
            padding: const EdgeInsets.only(bottom: 16),
            child: Row(
              children: [
                if (isCurrentStop)
                  Container(
                    width: 35,
                    height: 35,
                    margin: const EdgeInsets.only(right: 8),
                    decoration: BoxDecoration(
                      color: AppTheme.primaryBlue.withOpacity(0.1),
                      borderRadius: BorderRadius.circular(8),
                    ),
                    child: const Icon(
                      Icons.directions_bus,
                      color: AppTheme.primaryBlue,
                      size: 20,
                    ),
                  ),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        name,
                        style: TextStyle(
                          fontWeight: isCurrentStop
                              ? FontWeight.bold
                              : FontWeight.w500,
                          color: AppTheme.textDark,
                        ),
                      ),
                      const SizedBox(height: 4),
                      Row(
                        children: [
                          Text(
                            distance,
                            style: TextStyle(
                              color: AppTheme.textGrey,
                              fontSize: 12,
                            ),
                          ),
                          const SizedBox(width: 8),
                          Icon(Icons.people, size: 14, color: statusColor),
                          const SizedBox(width: 4),
                          Container(
                            padding: const EdgeInsets.symmetric(
                              horizontal: 8,
                              vertical: 2,
                            ),
                            decoration: BoxDecoration(
                              color: statusColor.withOpacity(0.1),
                              borderRadius: BorderRadius.circular(10),
                            ),
                            child: Text(
                              delay != null ? '$delay Delay' : 'On Time',
                              style: TextStyle(
                                color: statusColor,
                                fontSize: 10,
                                fontWeight: FontWeight.w500,
                              ),
                            ),
                          ),
                        ],
                      ),
                    ],
                  ),
                ),
                Column(
                  crossAxisAlignment: CrossAxisAlignment.end,
                  children: [
                    Text(
                      scheduledTime,
                      style: const TextStyle(
                        color: AppTheme.textDark,
                        fontWeight: FontWeight.w500,
                      ),
                    ),
                    Text(
                      actualTime,
                      style: TextStyle(
                        color: statusColor,
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ),
        ),
      ],
    );
  }
}
