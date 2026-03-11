import 'package:flutter/material.dart';
import '../theme/app_theme.dart';

class BackButtonWidget extends StatelessWidget {
  final VoidCallback? onPressed;
  final Color? backgroundColor;
  final Color? iconColor;

  const BackButtonWidget({
    super.key,
    this.onPressed,
    this.backgroundColor,
    this.iconColor,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 40,
      height: 40,
      decoration: BoxDecoration(
        color: backgroundColor ?? AppTheme.lightBlue.withOpacity(0.5),
        shape: BoxShape.circle,
      ),
      child: IconButton(
        onPressed: onPressed ?? () => Navigator.of(context).pop(),
        icon: Icon(
          Icons.arrow_back,
          color: iconColor ?? AppTheme.primaryBlue,
          size: 20,
        ),
        padding: EdgeInsets.zero,
      ),
    );
  }
}
